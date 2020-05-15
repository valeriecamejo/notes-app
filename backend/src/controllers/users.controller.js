const usersController = {}
const UserModel = require('../models/User')

usersController.getUsers = async (req, res) => {
  const users = await UserModel.find()
  res.json(users)
}

usersController.createUser = async (req, res) => {
  const { username } = req.body
  const newUser = new UserModel({username})
  await newUser.save()
  res.json({message: 'User Saved'})
}

usersController.getUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id })
  res.json(user)
}

usersController.updateUser = async (req, res) => {
  await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body )
  const userUpdate = await UserModel.findOne({ _id: req.params.id })
  res.json({message: 'User updated'})
}

usersController.deleteUser = async (req, res) => {
  await UserModel.findOneAndDelete(req.params.id)
  res.json({message: 'User deleted'})
}

module.exports = usersController