const { celebrate, Joi } = require('celebrate');

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  }),
})

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
  }),
})

const validationId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  })
})

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
    avatar: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
  }),
});

function validationLink(v) {
  return /^(https?:\/\/)?(www.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/.test(v);
}

module.exports = {
  validationLogin,
  validationUser,
  validationId,
  validationUpdateAvatar,
  validationUpdateUser,
  validationCard,
  validationLink
}