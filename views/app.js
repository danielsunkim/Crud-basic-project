var user = angular.module('user', ['ngRoute']);

// user.controller('getUser', ['$scope', 'userApi', function ($scope, userApi) {
//   $scope.display = 'hey';
// }]);

user.controller('getUser', ['$scope', 'userApi', '$location', '$http', '$filter', 'UserService',
function ($scope, userApi, $location, $http, $filter, UserService) {
  //Save the data from the forms inside new.html
  $scope.formData = {};
  userApi.getUser()
    .then(function (data) {
      $scope.userId = data.data.length;
    });
  // Handle the post request from new.html
  $scope.processForm = function () {
    $scope.formData.id = $scope.userId;
    $http({
      method: 'POST',
      url: '/user',
      // use jquery to serialized the object into key/values
      data: $.param($scope.formData),
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function (data) {
      $scope.list();
    });
  };

  //Returns the list of users, and redirect api/users if not already on it.
  $scope.list = function () {
    userApi.getUser()
      .then(function(data, err) {
        if (err) {
          $scope.display = 'There was an error';
        } else {
          $scope.display = data.data;
        }
      });
    return $location.path( '/user' );
  };

  //Redirect to the create page.
  $scope.create = function () {
    return $location.path( '/user/new' );
  };

  $scope.find = function () {
    return $location.path( '/user/:id' );
  };

  $scope.edit = function (id) {
    $http({
      method: 'GET',
      url: '/user/'+id+'/edit'
    }).then(function successCallback(data) {
      UserService.setUser(data.data);
    }, function errorCallback(err) {
      console.log(err);
    });
    $location.path( '/user/'+id+'/edit' );
  };

  $scope.update = function (id) {
    $http({
      method: 'PUT',
      url: '/user/'+id,
    }).then(function successCallback(data) {
      $location.path( '/user' );
    }, function errorCallback(err) {
      console.log(err);
    });
  };

}]);

user.controller('home', ['$scope', 'userApi', function ($scope, userApi) {
  $scope.display = 'Home page!';
}]);

user.controller('getUserId', ['$scope', 'userApi', function ($scope, userApi) {
  $scope.display = 'Get user by id';
}]);

user.controller('edit', ['$scope', 'userApi', '$http', '$location', 'UserService', function ($scope, userApi, $http, $location, UserService) {
  $scope.value = UserService.getUser();
}]);
// Configure routes
user.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './home.html',
      controller: 'home'
    })
    .when('/user', {
      templateUrl: './userGet.html',
      controller: 'getUser'
    })
    .when('/user/new', {
      templateUrl: './new.html',
      controller: 'getUser'
    })
    .when('/user/:id/edit', {
      templateUrl: './edit.html',
      controller: 'edit'
    })
    .when('/user/:id', {
      templateUrl: './getUserId.html',
      controller: 'getUserId'
    });
});

// Services
user.factory('userApi', ['$http', '$location', function ($http, $location) {
  return {
    getUser: function () {
      return $http.get('/user');
    }
  };
}]);

user.service('UserService', function(){
  var editingUser;
  this.setUser = function(user){
    editingUser = user;
  };

  this.getUser = function(){
    return editingUser;
  }
});
