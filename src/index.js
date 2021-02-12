const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const logs = require('./routes/logs')
const middlewares = require('./middlewares')

const port = process.env.PORT || 1337
const app = express()
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/', (req, res) => {
    res.json({
        message: 'server running',
    })
})

app.use('/routes/logs', logs)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => console.log(`listening on localhost:${port}`))