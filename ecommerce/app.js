const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressvalidator = require('express-validator')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

// app
const app = express()

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected!')
})

// routes
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressvalidator())
app.use(cookieParser())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})