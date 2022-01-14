const router = require('express').Router()

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

module.exports = router