const {BAD_REQUEST, NOT_FOUND, ERROR_DEFAULT} = require('../utils/errors');
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_DEFAULT;

  const message = statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;