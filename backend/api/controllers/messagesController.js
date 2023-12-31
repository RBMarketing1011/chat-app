const Message = require('../../db/models/messages')
const User = require('../../db/models/users')

//POST
//Private (Must be logged in)
//  /api/messages/:ownerId/:recipientId
const sendDirectMessage = async (req, res) =>
{
  const { ownerId, recipientId } = req.params
  const { message } = req.body
  const owner = await User.findById(ownerId)
  const recipient = await User.findById(recipientId)

  try
  {
    const newMessage = await Message.create({
      owner,
      recipients: recipient,
      message
    })

    owner.messages.push(newMessage._id)
    recipient.messages.push(newMessage._id)

    await owner.save()
    await recipient.save()

    const sendMessage = await Message.findById(newMessage._id).populate('owner').populate('recipients')

    res.status(200).json(sendMessage)
  } catch (err)
  {
    res.status(401).json({ message: 'Sorry, Message Not Sent. Please try Again' })
    console.log(err)
  }
}

//Delete
//Private
// /api/messages/:id
const deleteMessage = async (req, res) =>
{
  const { id } = req.params

  try
  {
    const message = await Message.findByIdAndDelete(id)
    await User.updateMany({}, {
      $pull: {
        messages: message._id
      }
    })

    res.status(200).json({ message: 'success' })

  } catch (err)
  {
    res.status(401).json({ message: 'Could Not Delete The Message' })
    console.log(err)
  }
}

module.exports = {
  sendDirectMessage,
  deleteMessage
}