const mongoose = require('mongoose')
const db = mongoose.connection

// Connect Mongoose to MongoDB
const connectDB = (url) =>
{
  mongoose.connect(`${ url }`)

  db.on('error', console.error.bind('connection error:'))
  db.once('open', () =>
  {
    console.log('Database Connected')
  })
}

module.exports = connectDB