const pool = require('../db/db')
const bcrypt = require('bcryptjs')

class TattooMasters{

   static async  getTattooMasters() {
        const [rows] = await pool.query('CALL SelectMasters()')
        return rows[0] // Возвращаем массив объектов
   }

//   Test
   static async getStatus(){
      const [rows] = await pool.query('SELECT status FROM tb_users WHERE status = true')
      return rows[0] // вернет [{status: true}]
   }

}


module.exports = TattooMasters