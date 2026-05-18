const pool = require('../db/db')
const bcrypt = require('bcryptjs')

class TattooMasters{

   static async  getTattooMasters() {
        const [rows] = await pool.query('CALL SelectMasters()')
        return rows[0] // Возвращаем массив объектов
   }

   static async create (email,password,status) {

      const salt = await bcrypt.genSalt(10) // сложность
      const hashedPassword  = await bcrypt.hash(password, salt) // хэш пароля

      const[rows] = await pool.query('INSERT INTO tb_users(email,password,status) VALUES(?,?,?)', [email,hashedPassword,status])
      return {id:rows.insertId, email,status}
   }

//   Test
   static async getStatus(){
      const [rows] = await pool.query('SELECT status FROM tb_users WHERE status = true')
      return rows[0] // вернет [{status: true}]
   }

}


module.exports = TattooMasters