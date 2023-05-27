require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const bookiesRoutes = require('./routes/bookies')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// app.get('/', (req, res)=> {
//     res.json({mssg: 'welcome to the app'})
// })
app.use('/api/users', userRoutes)
app.use('/api/bookies', bookiesRoutes)

// connect to db
mongoose.connect(process.env.NONAME_MONGO_URI)
    .then(() => {
        console.log('successfully connected to the db')
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })