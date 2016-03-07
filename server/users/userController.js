var User = require('./usersModel');
var Q = require('q');

var findUser = Q.nbind(User.findOne, User);
var findUsers = Q.nbind(User.find, User);
var createUser = Q.nbind(User.create, User);

var path = {
  '/': '/user',
  '/user': 'index'
};

module.exports = {
  // CREATE user
  userCreate: function (req, res) {
    createUser({
      name: 'john',
      age: 23,
      email: "adf@adfa.com"
    });
  },
  // Redirect to a endpoint
  redirect: function (req, res) {
    // if the path exist, render that path
    if (path[req.path]) {
      res.redirect(path[req.path]);
    }
  },
  // Render page
  render: function (req, res) {
    findUsers({}, function (err, users) {
      if (err) {
        console.error('User was not find!')
      } else {
        // render index with the data found
        res.render('index', {users: users});
      }
    });
  }

  //Create: /user
    // .POST
    // Create a new user, redirect

    //Read: /user
      // .GET
      // List all users

  //edit: /user/:id/edit
    // .GET
    // Edit a user

  //update: /user/:id
    // .PUT
    // Update particular user, redirect.

  //destroy: /user/:id
    // .delete
    // Delete a particular user, rediret.

}
