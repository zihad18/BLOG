require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk');


const setMiddleware = require('./middleware/middleware')
const setRoutes = require('./routes/routes')


// PlayGround Routes
//const validatorRoutes = require('./playground/validator')


const MONGODB_URI = 'mongodb://localhost:27017'


const app = express()





// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Using Middleware from Middleware directory

setMiddleware(app)

// Using  Routes from Routes directory
setRoutes(app)

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status === 404){
        return res.render('pages/error/404', {flashMessage: {}})
    }
    console.log(chalk.red.inverse(error.message))
    console.log(error)
    res.render('pages/error/500', {flashMessage: {}})
})

console.log(app.get('env'))
const PORT = process.env.PORT || 3000

mongoose.connect(MONGODB_URI,
    { useNewUrlParser: true}).then(()=>{
        console.log(chalk.green('Database Connected'))
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(e => {
      return  console.log(e)
    })


