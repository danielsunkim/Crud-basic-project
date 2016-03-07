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
  // CREATE: new user is added to the database
  app.post('/user', userController.userCreate);

  // SHOW route:
    // Do not need it for this project.

  // Get request for form to make an edit
  app.get('/user/:id/edit', userController.userById);
  // UPDATE: put request for the edit udpate
  app.put('/user/:id', userController.updateUserById );
  // DESTROY: Delete a user
  app.delete('/user/:id', userController.findUserByIdAndRemove);


}
