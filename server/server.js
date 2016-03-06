var express = require('express');
var app = express();
var mongoose = require('mongoose');
// connect to the crud data base, if it does not exist create crud.
mongoose.connect("mongodb://localhost/crud");

// Require middleware to deal with the POST request
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
// Grab static files to server files directly
// Require the config/routes
require('./config/routes.js')(app, express);

// Listen on the port number
var port = process.env.port || 3000;
app.listen(port, function () {
  console.log('Server started, listening port '+ port);
});

//export the app
module.exports = {
  app: app,
}
