const express = require('express')
const router = express.Router()

const catchAsync = require('express-async-handler')

const {
  userRegister,
  userLogin,
  userLogout,
  getUser,
  getAllUsers,
  getProfileFromJWT,
  deleteUser,
  updateUser
} = require('../controllers/usersController')

router.route('/register')
  .post(catchAsync(userRegister))

router.route('/login')
  .post(catchAsync(userLogin))

router.route('/logout')
  .post(userLogout)

router.route('/all')
  .get(catchAsync(getAllUsers))

router.route('/profile')
  .post(catchAsync(getProfileFromJWT))

router.route('/:id')
  .get(catchAsync(getUser))
  .patch(catchAsync(updateUser))
  .delete(catchAsync(deleteUser))

module.exports = router 