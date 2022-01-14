const User = require('../models/user');
const {BAD_REQUEST, NOT_FOUND, ERROR_DEFAULT} = require('../utils/errors');

const getUsers = (request, response) => {
  return User
    .find({})
    .then((users) => response.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const getUser = (request, response) => {
  const {userId} = request.params
  console.log(request.params)

  return User
    .findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => response.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        response.status(NOT_FOUND).send({message: 'Запрашиваемый пользователь не найден'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const createUser = (request, response) => {

  const {name, about, avatar} = request.body;

  User.create({name, about, avatar})
    .then(user => response.send({data: user}))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const patchUser = (request, response) => {

  const {name, about} = request.body;

  return User.findByIdAndUpdate(request.user._id, {name, about}, {new: true})
    .orFail(() => new Error('NotFound'))
    .then(user => response.send({data: user}))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные при обновлении профиля.'});
      } else if (err.message === 'NotFound') {
        response.status(NOT_FOUND).send({message: 'Пользователь с указанным _id не найден.'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

  const patchAvatar = (request, response) => {

    const {avatar} = request.body;

    return User.findByIdAndUpdate(request.user._id, {avatar}, {new: true})
      .orFail(() => new Error('NotFound'))
      .then(user => response.send({data: user}))
      .catch((err) => {
        if (err.name === 'CastError') {
          response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные при обновлении аватара.'});
        } else if (err.message === 'NotFound') {
          response.status(NOT_FOUND).send({message: 'Пользователь с указанным _id не найден.'});
        } else {
          response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
        }
      });
  }

    module.exports = {
      getUsers,
      getUser,
      createUser,
      patchUser,
      patchAvatar
    }