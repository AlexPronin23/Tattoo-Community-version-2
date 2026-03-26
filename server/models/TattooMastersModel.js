const pool = require('../db/db')

class TattooMasters{

   static async  getTattooMasters() {
        const [rows] = await pool.query('CALL SelectMasters()')
        return rows[0] // Возвращаем массив объектов
   }

}


module.exports = TattooMasters