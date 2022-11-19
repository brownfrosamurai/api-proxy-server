const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/error')
require('dotenv').config()

const PORT = process.env.PORT || 8080
const app = express()

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 50,
})
app.use(limiter)

// Set static folder 
// app.use(express.static('public'))

app.set('trust proxy', 1)

app.use('/api', require('./routes'))

// Enable cors 
app.use(cors())

// Error handler 
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))