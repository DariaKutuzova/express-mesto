const router = require('express').Router()

const { getUsers,
  getUser,
  patchUser,
  patchAvatar,
  getUserMe} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', patchUser);
router.get('/me', getUserMe);
router.patch('/me/avatar', patchAvatar);

module.exports = router