"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const {
	logController,
	handleError
} = require('./controllers');

const app = express();
const router = require('./router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(path.normalize(__dirname + '/../client')));

app.use('*', logController);
app.use('/', router);
app.use('*', handleError);


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});