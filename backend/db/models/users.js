const mongoose = require('mongoose')
const { Schema } = mongoose
const ppLocal = require('passport-local-mongoose')

const Message = require('./messages')

const user = new Schema({
  provider: {
    google: {
      id: {
        type: String,
      },
      displayName: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      email: {
        type: String
      },
      language: {
        type: String
      }
    },
  },
  displayName: {
    type: String
  },
  firstName: {
    type: String,
    unique: false
  },
  lastName: {
    type: String,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    minLength: 0o11111111,
    maxLength: 9999999999
  },
  role: {
    type: String,
    required: true
  },
  DOB: {
    type: Date
  },
  gender: {
    type: String
  },
  friends: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ],
  messages: [ {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  } ],
  groups: [ {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  } ]
}, { timestamps: true })

user.pre("save", function (next)
{
  if (this.email)
  {
    this.email = this.email.toLowerCase()
  }

  next()
})

user.post('findOneAndDelete', async (doc) =>
{
  if (doc)
  {
    await Message.deleteMany({
      _id: {
        $in: doc.messages
      }
    })
  }
})

user.plugin(ppLocal, { usernameField: 'email' })

module.exports = mongoose.model('User', user)