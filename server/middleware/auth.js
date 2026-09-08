const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

const auth = (req,res,next) => {
    
    try {

        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({message:'Не авторизован'})
        }

        const decode = jwt.verify(token,JWT_ACCESS_SECRET)

        req.user = decode
    
        next()
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = auth