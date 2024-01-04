const Jwt = require('jsonwebtoken')

const genToken = (res, userId) =>
{
  const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })

  cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000
  }

  res.cookie('_jwt_token', token, cookieOptions)
}

module.exports = genToken 