const express = require('express')
const router = express.Router()
const genToken = require('../../../utils/genToken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../../../db/models/users')

let finalUser

module.exports = Google = () =>
{
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/users/google/callback',
  },

    async (accessToken, refreshToken, profile, done) =>
    {
      try
      {
        const user = await User.findOne({ email: profile.email })
        if (user && user.provider.google.id === profile.id)
        {
          console.log('User Found With Google Data')

          finalUser = user

          done(null, user)
        } else if (user && user.provider.google.id !== profile.id)
        {
          console.log('User Found With No Google Data ... Updating User With Google Data')

          const id = user._id
          const user = await User.findByIdAndUpdate(id, {
            provider: {
              google: {
                id: profile.id,
                displayName: profile.displayName,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                language: profile.language
              }
            }
          })
          await user.save()

          finalUser = user

          done(null, user)
        } else
        {
          console.log('No User Found')

          const user = await User.create({
            provider: {
              google: {
                id: profile.id,
                displayName: profile.displayName,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                language: profile.language,
                firstLogin: Date.now()
              }
            },
            displayName: profile.displayName,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            password: 'Complete02!!',
            role: 'customer'
          })

          finalUser = user

          done(null, user)
        }
      } catch (err)
      {

        done(null, false, { message: 'Invalid Credentials' })
        console.log(err)
      }
    }))

  passport.serializeUser((user, done) =>
  {
    done(null, user)
  })

  passport.deserializeUser((user, done) =>
  {
    done(null, user)
  })
}

//=================== Google Auth Routes =============================

router.route('')
  .get(passport.authenticate('google', {
    scope: [ 'email', 'profile' ]
  }))

router.route('/callback')
  .get(passport.authenticate('google'),
    (req, res) =>
    {
      genToken(res, finalUser._id)
      res.redirect('http://localhost:3000')
    }
  )

module.exports = router