//[npm run dev] to run nodemon

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 100, //how many requests in the time above
})

//
app.use(express.static('public'))

app.use(limiter)
app.set('trust proxy', 1)

// Routes
app.use('/api', require('./routes/index.js'))

//Enable CORS
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port:${PORT}`))