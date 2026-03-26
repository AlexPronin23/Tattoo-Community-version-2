const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

const TattooMasterRouter = require('./routes/tattoomasterRoute')

// Middlewares
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))
//

app.use('/api/tattooMasters', TattooMasterRouter)


app.listen(PORT, () => {
    console.log(`Сервер слушает ${PORT}`);
    
})