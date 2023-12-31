const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('',
  passport.authenticate('google', {
    scope: [ 'email', 'profile' ]
  })
)

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
  })
)

module.exports = router