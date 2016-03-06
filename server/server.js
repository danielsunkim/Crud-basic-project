var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());
// Grab static files to server files directly
app.use(express.static('public'));

app.route('/')
  .get(function (req, res) {
    res.render('index.html');
  })

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log('Server started, listening port '+ port);
});
