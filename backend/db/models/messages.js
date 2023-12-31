const mongoose = require('mongoose')
const { Schema } = mongoose

const message = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipients: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ],
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Message', message)