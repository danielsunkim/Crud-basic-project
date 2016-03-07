var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    // Require middleware to deal with the POST request
    bodyParser = require('body-parser');

// connect to the crud data base, if it does not exist create crud.
mongoose.connect("mongodb://localhost/crud");
// set the view to ejs, no need to put index.ejs, just index.
app.set('view engine', 'ejs');
// Use the static files, the app.css file.
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());
// Require the config/routes
require('./config/routes.js')(app, express);
// Listen on the port number
var port = process.env.port || 3000;
app.listen(port, function () {
  console.log('Server started, listening port '+ port);
});

//export the app
module.exports = {
  app: app
}
