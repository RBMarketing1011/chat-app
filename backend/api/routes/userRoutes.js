const express = require('express')
const router = express.Router()

const catchAsync = require('express-async-handler')
const passport = require('passport')

const {
  userRegister,
  userLogout,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/usersController')

router.route('/register')
  .post(catchAsync(userRegister))

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failureLogin'
  }))

router.route('/logout')
  .get(userLogout)

router.route('/all')
  .get(catchAsync(getAllUsers))

router.route('/:id')
  .get(catchAsync(getUser))
  .patch(catchAsync(updateUser))
  .delete(catchAsync(deleteUser))

module.exports = router 