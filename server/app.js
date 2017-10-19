"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {
	logController,
	handleError
} = require('./controllers');

const app = express();
const router = require('./router.js');

app.use(bodyParser.json());
app.use(express.static(path.normalize(__dirname + '/../client')));

app.use('*', logController);
app.use('/', router);
app.use('*', handleError);


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});