const Card = require('../models/card');
const {BAD_REQUEST, NOT_FOUND, ERROR_DEFAULT} = require('../utils/errors');

const getCards = (request, response) => Card
    .find({})
    .then(cards => response.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    })

const deleteCard = (request, response) => {
    Card.findByIdAndRemove(request.params.cardId)
      .then(user => response.send({ data: user }))
      .catch((err) => {
        if (err.message === 'NotFound') {
          response.status(NOT_FOUND).send({message: 'Карточка с указанным _id не найдена.'});
        }
      });
}

const createCard = (request, response) => {

  const { name, link, owner } = request.body;

  Card.create({ name, link, owner })
    .then(card => response.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные при создании пользователя'});
      } else {
        console.log(err)
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const setLike = (request, response) => {

  Card.findByIdAndUpdate(
    request.params.cardId,
    { $addToSet: { likes: request.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => response.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные постановки лайка.'});
      } else if (err.message === 'NotFound') {
        response.status(NOT_FOUND).send({message: 'Передан несуществующий _id карточки.'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

const deleteLike = (request, response) => {

  console.log(request.user)

  Card.findByIdAndUpdate(
    request.params.cardId,
    { $pull: { likes: request.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => response.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        response.status(BAD_REQUEST).send({message: 'Переданы некорректные данные снятия лайка.'});
      } else if (err.message === 'NotFound') {
        response.status(NOT_FOUND).send({message: 'Передан несуществующий _id карточки.'});
      } else {
        response.status(ERROR_DEFAULT).send({message: 'Ошибка сервера'});
      }
    });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike
}