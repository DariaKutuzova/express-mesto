const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env

const app = express()

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '61e17281e3476c5b3f1fab3d' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {
  if (err){console.log(err)}})

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
