const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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
    type: String,
    required: true
  },
  firstName: {
    type: String,
    unique: false,
    required: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: {
      validator: function (v)
      {
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(v)
      },
      message: 'Please Enter A Valid Password'
    },
    required: true,
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

// Match user entered password to hashed password in database
user.methods.matchPassword = async function (enteredPassword)
{
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
user.pre("save", async function (next)
{
  if (this.email)
  {
    this.email = this.email.toLowerCase()
  }

  if (!this.isModified('password'))
  {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

user.post('findOneAndDelete', async function (doc)
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

module.exports = mongoose.model('User', user)