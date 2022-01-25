const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const {login, createUser} = require('./controllers/users.js');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require("./errors/NotFoundError");

const { PORT = 3000 } = process.env

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {
  if (err){console.log(err)}})

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((res, req, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
