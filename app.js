require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

// Import Routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

// Import Middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const  setLocals  = require('./middleware/setLocals')

// PlayGround Routes
//const validatorRoutes = require('./playground/validator')


const MONGODB_URI = 'mongodb://localhost:27017'
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Array
const Middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]
app.use(Middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
//app.use('/playground', validatorRoutes)

app.get('/', (req, res) => {

    

    res.send('Hello World')
})

console.log(app.get('env'))
const PORT = process.env.PORT || 3000

mongoose.connect(MONGODB_URI,
    { useNewUrlParser: true}).then(()=>{
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(e => {
      return  console.log(e)
    })


