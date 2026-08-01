const User = require('../models/UserModel')

class UserController{

        static async registration(req,res) {
    
        try {

         const{email,password,status} = req.body
         
         if(!email || !password){
            return res.status(400).json({message: 'Email и пароль обязательны'})
         }

         if(password.length < 8){
            return res.status(400).json({
               message:'Пароль должен содержать минимум 8 символов'
            })
         }

         const result = await User.registration(email,password,status)

         res.status(201).json({
            successMessage:'Пользователь создан',
            email: result.email
         })

            
        } catch (error) {
            console.error('Ошибка БД:', error)  // Лог для отладки

            res.status(500).json({
            message: "Произошла ошибка при регистрации"
      }); 
        }
    }
}

module.exports = UserController