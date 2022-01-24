const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {BAD_REQUEST, NOT_FOUND, ERROR_DEFAULT} = require('../utils/errors');

const getUsers = (request, response) => User
    .find({})
    .then((users) => response.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    })

const getUser = (request, response) => {
  const {userId} = request.params

  return User
    .findById(userId)
    // .orFail(() => new Error('NotFound'))
    .then((user) => {
      if (!user) {
        return response.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const getUserMe = (request, response) => {
  const {userId} = request.params

  return User
    .findById(userId)
    .then((user) => {
      if (!user) {
        return response.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const createUser = (request, response) => {

  const {name, about, avatar, email, password} = request.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name, about, avatar, email,
      password: hash, // записываем хеш в базу
    }))
    .then(user => response.send({data: user}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return response.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const patchUser = (request, response) => {

  const {name, about} = request.body;

  return User.findByIdAndUpdate(request.user._id, {name, about}, {new: true, runValidators: true,})
    // .orFail(() => new Error('NotFound'))
    .then((user) => {
      if (!user) {
        return response.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
      }
      return response.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
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

    return User.findByIdAndUpdate(request.user._id, {avatar}, {new: true, runValidators: true})
      // .orFail(() => new Error('NotFound'))
      .then((user) => {
        if (!user) {
          return response.status(NOT_FOUND).send({ message: 'Нет пользователя с таким id' });
        }
        return response.status(200).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные при обновлении аватара.'});
        } else if (err.message === 'NotFound') {
          response.status(NOT_FOUND).send({message: 'Пользователь с указанным _id не найден.'});
        } else {
          response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
        }
      });
  }

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key',
        { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

    module.exports = {
      getUsers,
      getUser,
      createUser,
      patchUser,
      patchAvatar,
      login,
      getUserMe
    }