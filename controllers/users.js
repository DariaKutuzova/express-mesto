const User = require('../models/user')

const getUsers = (request, response) => {
  return User
    .find({})
    .then(users => response.status(200).send(users))
    .catch(err => response.status(500).send({ message: err.message }));
}

const getUser = (request, response) => {
  const { id } = request.params

  return User
    .findById(id)
    .then(user => response.status(200).send(user))
    .catch(err => response.status(500).send({ message: err.message }));
}

const createUser = (request, response) => {

  const { name, about, avatar } = request.body;

  User.create({ name, about, avatar })
    .then(user => response.send({ data: user }))
    .catch(err => response.status(500).send({ message: err.message }));
}

const patchUser = (request, response) => {

  const { name, about } = request.body;

  return User.findByIdAndUpdate(request.user._id, { name, about }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then(user => response.send({ data: user }))
    .catch(err => response.status(500).send({ message: err.message }));
}

const patchAvatar = (request, response) => {

  const { avatar } = request.body;

  return User.findByIdAndUpdate(request.user._id, { avatar }, { new: true })
    .then(user => response.send({ data: user }))
    .catch(err => response.status(500).send({ message: err.message }));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  patchUser,
  patchAvatar
}