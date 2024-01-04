const User = require('../../db/models/users')
const genToken = require('../../utils/genToken')
const Jwt = require('jsonwebtoken')

//  POST    
//  Public
//  /api/users/register
const userRegister = async (req, res) =>
{
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists)
  {
    res.status(401)
    throw new Error('User Already Exists, Please log In')
  } else
  {
    try
    {
      const role = 'customer'
      const displayName = `${ firstName } ${ lastName }`
      const user = await User.create({ displayName, firstName, lastName, email, password, role })

      genToken(res, user._id)
      const sendUser = await User.findById(user._id)

      res.status(200).json(sendUser)
    } catch (err)
    {
      res.status(401).json(err)
      console.log(err)
    }
  }
}

//POST
//Public
//  /api/users/login
const userLogin = async (req, res) =>
{
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password)))
  {
    try
    {
      genToken(res, user._id)
      const sendUser = await User.findById(user._id).select('-password')
      res.status(200).json(sendUser)
    } catch (err)
    {
      res.status(401).json(err)
      console.log(err)
    }
  } else
  {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
}

//  GET
//  Private {Can Get your own, Admin can get all}
//  /api/users/:id
const getUser = async (req, res) =>
{
  const { id } = req.params
  const user = await User.findById(id).select('-salt').select('-hash')

  if (!user)
  {
    res.status(404).json('No User Found')
  } else
  {
    res.status(200).json(user)
  }
}

//  GET
//  Private {Can Get your own, Admin can get all}
//  /api/users/all
const getAllUsers = async (req, res) =>
{
  try
  {
    const users = await User.find({}).select('-salt').select('-hash')
    res.status(200).json(users)
  } catch (err)
  {
    res.status(401).json({ message: 'No Users Found' })
  }
}

//  GET
//  Private {isLoggedIn}
//  /api/users/logout
const userLogout = (req, res, next) =>
{
  req.logout(err =>
  {
    if (err)
    {
      return next(err)
    }
    res.status(200).json({ message: 'Logout Successful' })
  })
}

//  PUT
//  Private {update your own, Admin can update all}
//  /api/users/:id
const updateUser = async (req, res) =>
{
  const { id } = req.params
  const { firstname, lastName, email, password, gender, phoneNumber, DOB } = req.body

  try
  {
    const user = await User.findById(id)
    const updateUser = await User.findByIdAndUpdate(user._id, {
      ...user,
      firstname,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      DOB
    }).select('-salt').select('-hash')

    res.status(200).json(updateUser)
  } catch (err)
  {
    res.status(401).json(err.error)
  }

}

//  DELETE
//  Private {Can delete your profile, Admin can delete any}
//  /api/users/:id
const deleteUser = async (req, res) =>
{
  const { id } = req.params

  try
  {
    const user = await User.findByIdAndDelete(id)

    res.status(200).json({ message: `${ user.firstName } Deleted Successfully` })
  } catch (err)
  {
    res.status(401).json({ message: 'No User Found' })
  }
}

//POST
//Private
//  /api/users/profile
const getProfileFromJWT = async (req, res) =>
{
  let token
  token = req.cookies._jwt_token

  if (token)
  {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')

    res.json(user)
  } else
  {
    res.status(200)
  }
}

module.exports = {
  userRegister,
  userLogin,
  getUser,
  getAllUsers,
  getProfileFromJWT,
  userLogout,
  updateUser,
  deleteUser
}