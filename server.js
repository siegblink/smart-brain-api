const express = require('express');
const app = express();

const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smartbrain'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  const { users } = database;
  res.send(users);
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall());

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
