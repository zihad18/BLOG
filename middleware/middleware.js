const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const { bindUserWithRequest } = require('./authMiddleware')
const setLocals = require('./setLocals')

const MONGODB_URI = 'mongodb://localhost:27017'
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });

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
    flash(),
    bindUserWithRequest(),
    setLocals()
    
]

module.exports = app => {
    Middleware.forEach(m => {
        app.use(m)
    })
}