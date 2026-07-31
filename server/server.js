const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

const Router = require('./routes/index')

// Middlewares
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}))
//

app.use('/api', Router)



app.listen(PORT, () => {
    console.log(`Сервер слушает ${PORT}`);
    
})