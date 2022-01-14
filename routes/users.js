const router = require('express').Router()
const usersRouter = require('./users')

const { getUsers,
  getUser,
  createUser,
  patchUser,
  patchAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', patchUser);
router.get('/me/avatar', patchAvatar);


// router.use('/users', usersRouter)

router.use((req, res) => {
  res.status(404).send({message: `Ресурс по адресу "${req.path}" не найден`})
})

module.exports = router