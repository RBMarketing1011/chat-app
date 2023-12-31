const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../../db/models/users')

module.exports = (passport) =>
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
        console.log(profile.email)
        if (user && user.provider.google.id === profile.id)
        {
          console.log('User Found With Google Data')
          done(null, user)
        } else if (user && user.provider.google.id !== profile.id)
        {
          console.log('User Found With No Google Data ... Updating User With Google Data')
          const { id } = user
          const updateUser = await User.findByIdAndUpdate(id, {
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
          await updateUser.save()
          done(null, user)
        } else
        {
          console.log('No User Found')
          const user = new User({
            provider: {
              google: {
                id: profile.id,
                displayName: profile.displayName,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                language: profile.language,
                photos: '',
                firstLogin: Date.now()
              }
            },
            displayName: profile.displayName,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            role: 'customer'
          })
          const password = profile.id
          await User.register(user, password)
          done(null, user)
        }
      } catch (error)
      {
        res.status(401).json({ message: 'Invalid Login' })
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