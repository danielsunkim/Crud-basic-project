var userController = require('../users/userController');



module.exports = function (app, express) {
  // root directory
  app.get('/', userController.redirect)
  // Read: List all users
  app.get('/user', userController.render)
  // Form to add new user
  app.get('/user/new', function (req, res) {
    res.render('new');
  });
  // Create: new user is added to the database
  app.post('/user', userController.userCreate);

  // SHOW route:

  // Update: Update a particular user
  app.get('/user/:id/edit', userController.updateUser);

  // Delete: Delete a user
  app.route('/user/:id/edit')
    .delete(function (req, res) {
      console.log('destroy this route');
    });


}
