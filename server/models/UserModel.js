const pool = require('../db/db')
const bcrypt = require('bcryptjs')


class UserModel{

    static async registration(email,password,status) {

      const salt = await bcrypt.genSalt(10) // сложность
      const hashedPassword  = await bcrypt.hash(password, salt) // хэш пароля

      const[rows] = await pool.query('INSERT INTO tb_users(email,password,status) VALUES(?,?,?)', [email,hashedPassword,status])
      return {id:rows.insertId, email,status}
   }

}

module.exports = UserModel