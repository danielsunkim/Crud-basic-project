var User = require('./usersModel');
var Q = require('q');


// Just
var findUser = Q.nbind(User.findOne, User),
    findUsers = Q.nbind(User.find, User),
    createUser = Q.nbind(User.create, User),
    findUserById = Q.nbind(User.findById, User),
    findAndUpdate = Q.nbind(User.findByIdAndUpdate, User),
    findAndRemove = Q.nbind(User.findByIdAndRemove, User);

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
        // If successful, go to the /user route, and show the names!
        res.redirect('/user');
      })
      .catch(function (err) {
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

  //READ: /user
    // .GET
    // List all users
  render: function (req, res) {
    findUsers({}) 
      .then(function (users) {
        // render index with the data found
        if (users.length === 0) { 
          // If empty, send a false statement to the index page.
          res.render('index', {users: false});
        } else {
          // if successful, render index, and send data package to the index page.
          res.render('index', {users: users});
        }
      })
      .catch(function (err) {
        console.error('User was not find!')
      });
  },

  userById: function (req, res) {
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
  },
  //UPDATE: /user/:id/edit
    // .GET
    // Edit a user
  updateUserById: function (req, res) {
    // findAndUpdate(id, newData, callback)
    // req.body.user coming from the form inside the edit page
    findAndUpdate(req.params.id, req.body.user)
      .then(function (updatedUser) {
        // if successful take back to the home page to see the udpate
        res.redirect('/user');
      })
      .catch(function (err) {
        console.error(err);
        res.redirect('/user/'+req.params.id+'/edit');
      })
  },
  //DESTROY: /user/:id
    // .delete
    // Delete a particular user, rediret.
  findUserByIdAndRemove: function (req, res) {
    findAndRemove(req.params.id)
      .then (function (removeUser) {
        res.redirect('/user');
      })
      .catch(function (err) {
        console.error('Error', err);
        res.redirect('/user');
      });
  }
}
