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

}


module.exports = TattooMastersController