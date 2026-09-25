const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser'); 
const sequelize = require('./db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Models
const { TattooMasters,Users, SpStyles, Portfolio } = require('./models/index');


const app = express()
const PORT = process.env.PORT

// Middlewares
const auth = require('./middleware/auth')
app.use(express.json({limit:'50mb'}))
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
//

// Routes

// 1. TattooMasters

// 1.1 Получение данных о тату мастерах
app.get('/api/tattoomasters', async (req,res) => {

    try {
        const masters = await TattooMasters.findAll({raw:true})

        res.json({
            masters:masters
        })

        
    } catch (error) {
        return res.status(500).json({message:'Ошибка на сервере'})
       
        
    }
    
})

// 1.2 Получение стилей 
app.get('/api/styles', async (req,res) => {
    try {

        const styles = await SpStyles.findAll({raw:true})

        res.json({
            styles:styles
        })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

//1.3 Создание анкеты
app.post('/api/tattoomasters/profile', auth, async (req,res) => {
    const {firstName,lastName,experience,isColored,isAtHome,tattooSalon,description,cardImg,styleIds} = req.body
    const userId = req.user.id

    const normalizedStyleIds = Array.from(
    Array.isArray(styleIds) ? styleIds : [styleIds],
        (id) => Number(id)
    ).filter((id) => !Number.isNaN(id) && id > 0);

    if (normalizedStyleIds.length === 0) {
        return res.status(400).json({ message: 'Выберите хотя бы один стиль' });
    }

    try {
        const [master] = await TattooMasters.upsert({
            user_id:userId,
            first_name:firstName,
            last_name:lastName,
            experience:experience,
            isColored:isColored,
            isAtHome:isAtHome,
            tattooSalon:tattooSalon || 'Фриланс',
            description:description,
            cardImg:cardImg || null
        }) // Экземпляр модели 

        const styles = await SpStyles.findAll({
            where:{style_id:normalizedStyleIds}
        })

        if(styles.length === 0) {
             return res.status(400).json({ message: 'Стили не найдены' });
        }

        await master.setStyles(styles)

        const result  = await TattooMasters.findOne({
            where:{user_id:userId},
            include:[{
                model:SpStyles,
                as:'styles',
                through:{attributes:[]}
            }]
        })

        res.json({message:'Анкета была создана', master:result} )

    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

app.get('/api/tattoomasters/check', auth, async (req,res) => {
    const id = req.user.id
    
    try {

        const master = await TattooMasters.findOne({where:{user_id:id},  include: [{
        model: SpStyles,
        as: 'styles',
        through: { attributes: [] }
    }]})

         if(!master){
            return res.status(404).json({message:'Пользователь не найден'})
        }

        res.json({
            master:master
        })


        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//1.4 Получение информации об одном мастере
app.get('/api/tattoomasters/:id', auth, async (req,res) => {
    const {id} = req.params

    try {
        const master = await TattooMasters.findOne({
            where:{user_id:id},
            include:[{
                model:SpStyles,
                as:'styles',
                through:{
                    attributes:[]
                }
            }]
        }
        )

        if(!master) {
            return res.status(404).json({message:'Мастер не найден!'})
        }

        res.json({
            master:master
        })

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


// 2. Users

// 2.1 Регистрация пользователей

app.post('/api/user/registration', async (req,res) => {
    const {email,phone,password,status} = req.body

    try {
        const user = await Users.findOne({where:{email:email,phone:phone, password:password}}, {raw:true})
        if(user) {
           return res.status(409).json({message:'Пользователь с таким данными уже существует'})
        }

        const salt = bcrypt.genSaltSync(7)
        const hashedPassword = bcrypt.hashSync(password,salt)

        const data = await Users.create({
            email:email,
            phone:phone,
            password:hashedPassword,
            status:status
        })

        res.json({
            user:data,
            message:'Успешная регистрация!'
        })

    } catch (error) {
        res.status(500).json({error:error.message})
    }

})

// 2.1 Авторизация пользователей

app.post('/api/user/login', async (req,res) => {

    const{email,password} = req.body

    try {
        
        if(!email || !password){
            return res.status(400).json({message:'Логин и пароль должны быть заполнены'})
        }

        const user = await Users.findOne({where: {email:email}}, {raw:true})

        if(!user){
            return res.status(401).json({message:`Пользователь с такими данными не существует`})
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if(!isPasswordValid){
            return res.status(409).json({message:'Неверный пароль'})
        }

        const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

        const token = jwt.sign({
            id:user.user_id,
            email:user.email
        }, JWT_ACCESS_SECRET,{expiresIn:'7d'})

        res.cookie('token',token, {
            httpOnly:true,
            sameSite:'lax',
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        res.json({
            user:{
                id:user.user_id,
                email:user.email,
                phone:user.phone,
                status:user.status

            },
            message:'Успешная авторизация'
        })

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

})

// 2.2 Аутентификация пользователей
app.get('/api/user/auth', auth,  async (req,res) => {
    const {id} = req.user
    
    try {

        const user = await Users.findOne({where:{user_id:id}, attributes: { exclude: ['password'] }}, {raw:true})

        if(!user){
            return res.status(401).json({message:'Пользователь не найден'})
        }

        res.json({
            message:'Доступ разрешен',
            user:user
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

//2.3 Выход из профиля
app.post('/api/user/logout', (req,res) => {

    res.clearCookie('token',{
    httpOnly:true,
    sameSite:'lax',

 })
 res.json({message:'Выход выполнен успешно'})
})

// 3. Portfolio

// 3.1 Создание портфолио(добавление фото)
app.post('/api/portfolio', auth, async(req,res) => {
    const {images} = req.body

    if(!images || !Array.isArray(images) || images.length === 0) {
        res.status(400).json({message:'Нет фото'})
    }

    if(images.length > 6) {
        res.status(400).json({message:'Максимум 6 фото'})
    }
    
     if (images.length > 7 * 1024 * 1024) {
            return res.status(400).json({ message: 'Фото слишком большое' });
     }

     try {

        const rows = images.map((img) => ({
            user_id:req.user.id,
            img
        })) // Получем из строки Base64 объект с данными 

        await Portfolio.bulkCreate(rows) // Добавляет одним разом все фото

        const photos = await Portfolio.findAll({where:{user_id:req.user.id}},{raw:true})
        
        res.json({photos})
        
     } catch (error) {
         res.status(500).json({ message: error.message });
     }

})

app.get('/api/portfolio', auth, async(req,res) => {
    try {
        const photos = await Portfolio.findAll({where:{user_id:req.user.id}},{raw:true})
        res.json({photos})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//


// Connection
sequelize.sync({force:false})
    .then(() => {
        console.log('База данных синхронизирована');
        app.listen(PORT,  () => {
            console.log(`Сервер слушает ${PORT} порт`);
            
        })
    })
    .catch((err) => {
        console.error(err);
        
    })




