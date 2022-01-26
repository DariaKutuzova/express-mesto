const { validationId,
  validationUpdateAvatar,
  validationUpdateUser } = require('celebrate');
const router = require('express').Router()

const { getUsers,
  getUser,
  patchUser,
  patchAvatar,
  getUserMe} = require('../controllers/users');

router.get('/me', getUserMe);
router.get('/:userId', validationId, getUser);
router.get('/', getUsers);
router.patch('/me', validationUpdateAvatar, patchUser);
router.patch('/me/avatar', validationUpdateUser, patchAvatar);

module.exports = router