const router = require('express').Router()
const usersRouter = require('./cards')

const { getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', deleteLike);

// router.use('/cards', usersRouter)

router.use((req, res) => {
  res.status(404).send({message: `Ресурс по адресу "${req.path}" не найден`})
})

module.exports = router