var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number
});

var animalSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// var Animal = mongoose.model('Animal', animalSchem
var User = mongoose.model('User', userSchema);
var Animal = mongoose.model('Animal', animalSchema);


// User.User to access because it an object. This is why it wasn't working earlier, {User: User}
module.exports = {
  User: User,
  Animal: Animal
};
