var User = require('./usersModel');
var Q = require('q');

var findUser = Q.nbind(User.findOne, User),
    findUsers = Q.nbind(User.find, User),
    createUser = Q.nbind(User.create, User),
    findUserById = Q.nbind(User.findById, User);

var path = {
  '/': '/user',
  '/user': 'index',
  '/user/new': 'new'
};

module.exports = {
  // CREATE user,
    // If there is post request, give it the input form params, the object
  userCreate: function (req, res) {
    createUser(req.body.user)
      .then(function (user) {
        console.log('User was created!');
        // If successful, go to the /user route, and show the names!
        res.redirect('/user');
      }).catch(function (err) {
        console.error('problem creating user', err);
        // If failed, stay on the /user/new page
        res.render('new');
      });
  },
  // Redirect to a endpoint
  redirect: function (req, res) {
    // if the path exist, render that path
    if (path[req.path]) {
      res.redirect(path[req.path]);
    }
  },

  //Read: /user
    // .GET
    // List all users
  render: function (req, res) {
    findUsers({}, function (err, users) {
      if (err) {
        console.error('User was not find!')
      } else {
        // render index with the data found
        console.log(users.length)
        if (users.length === 0) {
          // If empty, send a false statement to the index page.
          res.render('index', {users: false});
        } else {
          // if successful, render index, and send data package to the index page.
          res.render('index', {users: users});
        }
      }
    });
  },
  //update: /user/:id
    // .PUT
    // Update particular user, redirect.
  updateUser: function (req, res) {
    // Find user by id, then do something with it
     findUserById(req.params.id)
        .then(function(foundUser) {
          // Render the edit page, and send over the users information
          res.render('edit', {users: foundUser});
        })
        .catch(function (err) {
          // if not, throw and error and redirect to user page
          console.error('You got an error ', err);
          res.redirect('/user');
        });
  }


    // .POST
    // Create a new user, redirect


  //edit: /user/:id/edit
    // .GET
    // Edit a user



  //destroy: /user/:id
    // .delete
    // Delete a particular user, rediret.

}
