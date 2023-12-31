const mongoose = require('mongoose')
const { Schema } = mongoose

const Message = require('./messages')

const group = new Schema({
  title: {
    type: String,
    required: true
  },
  members: [ {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  } ],
  messages: [ {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  } ]
}, { timestamps: true })

group.post('findOneAndDelete', async (doc) =>
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

module.exports = mongoose.model('Group', group)