// Dependencies
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
//initialize dotenv
dotenv.config()
const morgan = require('morgan')
const path = require('path')
const MongoStore = require('connect-mongo')
const session = require('express-session')

//importing database connection
const connectDB = require('../backend/db/connection')

//initialize express
const app = express()

//Setup Dependencies
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

//setup CORS policies
//CORS Options 
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Import Route Files
//Users
const userAuthRoutes = require('./api/routes/userRoutes')
//passport login with social accounts
const googleAuthRoutes = require('./api/routes/passportAuthRoutes/googleAuthRoutes')
//Messages
const messageRoutes = require('./api/routes/messageRoutes')
//Groups
const groupRoutes = require('./api/routes/groupRoutes')

//import passport config file 
const passport = require('passport')
// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())
require('./api/routes/passportAuthRoutes/googleAuthRoutes')
Google()

//set up production build
if (process.env.NODE_ENV === 'production')
{
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  )
  //if production send secure cookie
  sessionConfig.cookie.secure = true
} else // If In Development
{
  app.get('/', (req, res) =>
  {
    res.send('API is running....')
  })
  //Use Morgan in dev mode
  app.use(morgan('dev'))
}

//Routes
//Passport social logins
app.use('/api/users/google', googleAuthRoutes)
//Users
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