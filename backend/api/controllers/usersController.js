const User = require('../../db/models/users')

//  POST    
//  Public
//  /api/users/register
const userRegister = async (req, res) =>
{
  try
  {
    const { firstName, lastName, email, password } = req.body
    const role = 'customer'
    const displayName = `${ firstName } ${ lastName }`
    const user = new User({ displayName, firstName, lastName, email, role })
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err =>
    {
      if (err) return next(err)
      res.status(200).json({ message: 'User Registered Successfully' })
    })
  } catch (err)
  {
    res.status(401).json(err.message)
  }
}

// =========== User Login Set Up and executed by PASSPORT.JS

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

module.exports = {
  userRegister,
  getUser,
  getAllUsers,
  userLogout,
  updateUser,
  deleteUser
}