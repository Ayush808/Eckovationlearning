const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')//bcz we are saving user credentials in the cookie
const expressValidator = require('express-validator')
const path = require('path')

//import the .env file
require('dotenv').config()

//connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log("Mongo connected!") })
    .catch(() => console.log('Mongo connection failed'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})


// Serve static assets in production
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'))
})


// application running on
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
