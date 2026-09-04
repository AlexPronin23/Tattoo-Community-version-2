const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser'); 
const sequelize = require('./db/db')
require('dotenv').config()

// Models
const TattooMasters = require('./models/TattooMasters')

const app = express()
const PORT = process.env.PORT

// Middlewares
app.use(express.json())

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




