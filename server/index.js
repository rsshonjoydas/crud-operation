// ? external imports
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
// ? internal imports
const postMessageRoute = require('./controllers/postMessageController');

dotenv.config();
const PORT = process.env.PORT || 5000;

const setupMongo = async () => {
  const uri = `${process.env.MONGO_CONNECTION_STRING}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(uri, options);
    console.log('database connection successfully!');
    mongoose.Promise = global.Promise;
  } catch (error) {
    console.log(
      'Error while connecting MongoDB: ' + JSON.stringify(error, undefined, 2)
    );
  }
};

const init = async () => {
  let app = express();

  // ? request parser
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/postMessages', postMessageRoute);

  app.use('/', (req, res) => {
    res.send('RS Shonjoy' + new Date());
  });

  await setupMongo();

  await app.listen(5000);
  console.log(`app listing to port ${PORT}`);
};

init();
