var User = require('./usersModel').User;
var Animal = require('./usersModel').Animal;
// var Animal = require('./usersModel').Animal;
// User.User to access because it an object. This is why it wasn't working earlier
var Q = require('q');

// Use promises using Q
var findUser = Q.nbind(User.findOne, User),
    findUsers = Q.nbind(User.find, User),
    createUser = Q.nbind(User.create, User),
    findUserById = Q.nbind(User.findById, User),
    findAndUpdate = Q.nbind(User.findByIdAndUpdate, User),
    findAndRemove = Q.nbind(User.findByIdAndRemove, User);

module.exports = {
  // CREATE user,
    // If there is post request, give it the input form params, the object
  userCreate: function (req, res) {
    createUser(req.body)
      .then(function (user) {
        // If successful, go to the /user route, and show the names!
        user.save(function (err, data) {
          if ( err ) {
            res.send(err);
          }
          res.status(200).json(data)
        })
      })
      .catch(function (err) {
        console.error('problem creating user', err);
        // If failed, stay on the /user/new page
      });
  },
  // g
  rootHomepage: function (req, res) {
    // if the path exist, render that path
    res.send("Hey there, you're at the homepage!")
  },

  //READ: /user
    // .GET
    // List all users
  findAllUsers: function (req, res) {
    findUsers({})
      .then(function (users) {
        res.status(200).json(users);
      })
      .catch(function (err) {
        console.error('You got an error ', err);
      });
  },

  userById: function (req, res) {
    console.log('hello')
    // Find user by id, then do something with it
    findUser({_id: req.params.id})
      .then(function(foundUser) {
        // Render the edit page, and send over the users information
        res.status(200).json(foundUser);
      })
      .catch(function (err) {
        // if not, throw and error and redirect to user page
        console.error('You got an error ', err);
      });
  },
  //UPDATE: /user/:id/edit
    // .GET
    // Edit a user
  updateUserById: function (req, res) {
    // findAndUpdate(id, newData, callback)
    // req.body.user coming from the form inside the edit page
    findAndUpdate(req.params.id, req.body)
      .then(function (updatedUser) {
        // if successful take back to the home page to see the udpate
        console.log('asdfafasdfasfdsfasdf SHIVA', updatedUser)
        res.status(200).send(updatedUser);

      })
      .catch(function (err) {
        console.log('asdfafasdfasfdsfasdf ERRRORR')
        console.error('You got an error ', err);
      })
  },
  //DESTROY: /user/:id
    // .delete
    // Delete a particular user, rediret.
  findUserByIdAndRemove: function (req, res) {
    findAndRemove(req.params.id)
      .then (function (removeUser) {
        res.status(200).json(removeUser);
      })
      .catch(function (err) {
        console.error('You got an error ', err);
      });
  }
}
