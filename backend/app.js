// Dependencies
const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const MongoStore = require('connect-mongo')
const session = require('express-session')

//initialize dotenv
dotenv.config()

//initialize express
const app = express()

// PASSPORT CONFIG
const passport = require('passport')
const localStrategy = require('passport-local')
const GoogleStrategy = require('./api/passport/google')(passport)

//importing DB schemas
const user = require('./db/models/users')

//importing my files
const connectDB = require('../backend/db/connection')

// MORGAN CONFIG
if (process.env.Node_ENV === 'development')
{
  app.use(morgan('dev'))
}

//setup session config
let sessionConfig = {
  name: '_chat_app_Session',
  secret: `${ process.env.SESSION_SECRET }`,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongoUrl: `${ process.env.MONGO_URI }`
  }),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  }
}

//Use session config in express-session
app.use(session(sessionConfig))

//send secure cookie if in production
if (process.env.NODE_ENV === 'production')
{
  sessionConfig.cookie.secure = true
}

// Import Route Files
//Users
const userAuthRoutes = require('./api/routes/userRoutes')
const googleAuthRoutes = require('./api/routes/googleAuthRoutes')
//Messages
const messageRoutes = require('./api/routes/messageRoutes')
//Groups
const groupRoutes = require('./api/routes/groupRoutes')

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy({
  usernameField: 'email'
}, user.authenticate()))

//Setup Dependencies
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) =>
{
  res.send('This is Home page of the App')
})

//Routes
//Users
app.use('/api/users/google', googleAuthRoutes)
app.use('/api/users', userAuthRoutes)
//Messages
app.use('/api/messages', messageRoutes)
//Groups
app.use('/api/groups', groupRoutes)

//Failure Login JSON message
app.get('/failureLogin', (req, res) =>
{
  res.status(401).json({ message: 'Invalid Credentials' })
})



//connect db
connectDB(process.env.MONGO_URI)

app.listen(process.env.PORT, () =>
{
  console.log(`App running on port ${ process.env.PORT }`)
})