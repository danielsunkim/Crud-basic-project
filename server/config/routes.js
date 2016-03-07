var userController = require('../users/userController');



module.exports = function (app, express) {
  // root directory
  app.get('/', userController.redirect)
  // Read: List all users
  app.get('/user', userController.render)
  // Form to add new user
  app.route('/user/new')
    .get(function (req, res) {
      console.log('Create form route');
    });
  // Create: new user is added to the database
  app.route('/user')
    .post(function (req, res) {
      console.log('Create route, posted');
    });
  // Update: Update a information on a user
  app.route('/user/:id')
    .put(function (req, res) {
      console.log('Update this route');
    });
  // Delete: Delete a user
  app.route('/user/:id/edit')
    .delete(function (req, res) {
      console.log('destroy this route');
    });


}
