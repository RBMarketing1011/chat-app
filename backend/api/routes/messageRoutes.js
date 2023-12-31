const express = require('express')
const router = express.Router()
const catchAsync = require('express-async-handler')

const {
  sendDirectMessage,
  deleteMessage
} = require('../controllers/messagesController')

router.route('/:ownerId/:recipientId')
  .post(catchAsync(sendDirectMessage))

router.route('/:id')
  .delete(catchAsync(deleteMessage))

module.exports = router