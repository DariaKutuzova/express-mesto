const Card = require('../models/card')

const getCards = (request, response) => {
  return Card
    .find({})
    .then(cards => response.status(200).send(cards))
    .catch(err => response.status(500).send({ message: err.message }));
}

const deleteCard = (request, response) => {
    Card.findByIdAndRemove(request.params.id)
      .then(user => response.send({ data: user }))
      .catch(err => response.status(500).send({ message: err.message }));
}

const createCard = (request, response) => {

  const { name, link } = request.body;

  Card.create({ name, link })
    .then(card => response.send({ data: card }))
    .catch(err => response.status(500).send({ message: err.message }));
}

const setLike = (request, response) => {

  Card.findByIdAndUpdate(
    request.params.cardId,
    { $addToSet: { likes: request.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => response.send({ data: card }))
    .catch(err => response.status(500).send({ message: err.message }));
}

const deleteLike = (request, response) => {

  Card.findByIdAndUpdate(
    request.params.cardId,
    { $pull: { likes: request.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => response.send({ data: card }))
    .catch(err => response.status(500).send({ message: err.message }));
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike
}