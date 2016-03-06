var User = require('../users/userController');



module.exports = function (app, express) {
  // root directory
  app.route('/')
    .get(function (req, res) {
      console.log('hello');
      app.use(express.static('public'));
    });
  // // Read: List all users
  // app.route('/user')
  //   .get(function (req, res) {
  //
  //   });
  // // Form to add new user
  // app.route('/user/new')
  //   .get(function (req, res) {
  //
  //   });
  // // Create: new user is added to the database
  // app.route('/user')
  //   .post(function (req, res) {
  //
  //   });
  // // Update: Update a information on a user
  // app.route('/user/:id')
  //   .put(function (req, res) {
  //
  //   });
  // // Delete: Delete a user
  // app.route('/user/:id/edit')
  //   .delete(function (req, res) {
  //
  //   });


}
