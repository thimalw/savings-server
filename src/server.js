const debug = require('debug')('server:debug');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to MongoDB
mongoose.connect(config.get('database'), { useNewUrlParser: true })
  .catch(err => {
    // check for database connection errors and abort (throw) if an error has occured
    throw new Error('Database connection failed! err: ' + err);
  });

mongoose.connection.once('open', () => {
  debug('MongoDB database connection established successfully');
});

const app = express();

// load middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup routes
// app.use('/v1', require('./routes'));

// start express server
let listen = app.listen(config.get('port'), () => {
  console.log('Server is listening on port ' + config.get('port'));
});

module.exports = app;
module.exports.port = listen.address().port;
