const Group = require('../../db/models/groups')
const Message = require('../../db/models/messages')
const User = require('../../db/models/users')

//POST
//Private
//  /api/groups/create/:ownerId
const createGroup = async (req, res) =>
{
  const { id } = req.params
  const { title, members, message } = req.body

  try
  {
    const group = await Group.create({
      title,
      members
    })

    const newMessage = await Message.create({ message })

    group.messages.push(newMessage._id)
    await group.save()

    res.status(200).json({ message: 'Group Created Successfully' })

  } catch (err)
  {
    res.status(401).json(err)
    console.log(err)
  }
}

//GET
//Private
//  /api/groups/:id 
const getGroup = async (req, res) =>
{
  const { id } = req.params
  try
  {
    const group = await Group.findById(id).populate('messages')
    res.status(200).json(group)
  } catch (err)
  {
    res.status(401).json({ message: 'Could Not get Group' })
  }
}

//PATCH
//Private
//  /api/groups/:id
const updateGroup = async (req, res) =>
{
  const { id } = req.params
  const { title, members, messages } = req.body

  try
  {
    const group = await Group.findByIdAndUpdate(id, { title })
    const newMessage = await Message.create({ message: messages })
    group.members.push(members)
    group.messages.push(newMessage)
    await group.save()

    res.status(200).json(group)
  } catch (err)
  {
    res.status(401).json({ message: 'Could Not Update group' })
    console.log(err)
  }
}

//DELETE
//Private
//  api/groups/:id
const deleteGroup = async (req, res) =>
{
  const { id } = req.params
  try
  {
    await Group.findByIdAndDelete(id)

    res.status(200).json({ message: 'Group Deleted Successfully' })
  } catch (err)
  {
    res.status(401).json({ message: 'Could Not Delete Group' })
    console.log(err)
  }
}

module.exports = {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup
}