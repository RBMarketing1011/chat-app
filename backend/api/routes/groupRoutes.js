const express = require('express')
const router = express.Router()

const catchAsync = require('express-async-handler')

const {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup
} = require('../controllers/groupsController')

router.route('/create')
  .post(catchAsync(createGroup))

router.route('/:id')
  .get(catchAsync(getGroup))
  .patch(catchAsync(updateGroup))
  .delete(catchAsync(deleteGroup))

module.exports = router