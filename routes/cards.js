const router = require('express').Router();
const { validationCard, validationId } = require('../middlewares/validation');

const { getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validationCard, createCard);
router.delete('/:cardId', validationId, deleteCard);
router.put('/:cardId/likes', validationId, setLike);
router.delete('/:cardId/likes', validationId, deleteLike);

module.exports = router