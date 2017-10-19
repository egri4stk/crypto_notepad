var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var router = require('./router.js');

app.use(bodyParser.json());
app.use(express.static(path.normalize(__dirname + '/../client')));

app.use('/',router);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});