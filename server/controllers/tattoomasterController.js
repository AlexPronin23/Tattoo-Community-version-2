const TattooMasters = require('../models/TattooMastersModel')


class TattooMastersController {

    // Функция для получения данных Тату мастеров
    static async getTattooMasters(req,res) {

        try {
            
        const data = await TattooMasters.getTattooMasters() // Вернет массив объектов
        res.json({
            data:data,
            message:'Данные успешно загружены' // для отладки
        })

        } catch (error) {
            res.status(500).json({
                errorMessage: error.message
            })
        }
    }

    static async create(req,res) {
    
        try {
         
         if(!req.body.email || !req.body.password){
            return res.status(400).json({message: 'Данные обязательны'})
         }

         const{email,password,status} = req.body

         const result = await TattooMasters.create(email,password,status)

         res.status(201).json({
            successMessage:'Пользователь создан',
            email: result.email
         })

            
        } catch (error) {
             console.error('Ошибка БД:', error)  // ← Лог для отладки

            res.status(500).json({

            error: error.message,

            message: "Ошибка сервера"

 }) 
            
        }
    }

}


module.exports = TattooMastersController