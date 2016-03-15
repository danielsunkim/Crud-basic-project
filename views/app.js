var user = angular.module('user', ['ngRoute', 'ngResource']);

// user.controller('getUser', ['$scope', 'userApi', function ($scope, userApi) {
//   $scope.display = 'hey';
// }]);

user.controller('getUser', ['$scope', 'userApi', '$location', '$http', '$filter', 'UserService',
function ($scope, userApi, $location, $http, $filter, UserService) {
  //Save the data from the forms inside new.html
  $scope.formData = {};
  $scope.userPage = userApi.userPage;
  $scope.createPage = userApi.createPage;
  $scope.findPage = userApi.findPage;
  $scope.editPage = userApi.editPage;
  $scope.foundPage = userApi.foundPage;

  //Current ID
  userApi.userLength(function (data) {
      $scope.userId = data;
  });

  // Handle the post request from new.html
  $scope.processForm = function () {
    $scope.formData.id = $scope.userId;
    return $http({
      method: 'POST',
      url: '/user',
      // use jquery to serialized the object into key/values
      data: $.param($scope.formData),
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function success (data) {
      $scope.userPage();
    }, function error (err) {
      console.error(err);
    });
  };
  $scope.editPage = function (id) {
    return $http({
      method: 'GET',
      url: '/user/'+id+'/edit'
    }).then(function successCallback(data) {
      UserService.setUser(data.data);
      $scope.editPage(id);
    }, function errorCallback(err) {
      console.error(err);
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
    $scope.userPage();
  };
  $scope.update = function () {
    $scope.value = UserService.getUser();
    console.log('$scope.value', $scope.value._id)
    return $http({
      method: 'PUT',
      url: '/user/'+$scope.value._id,
      data: $scope.formData
    }).then(function successCallback(data) {
      $scope.userPage();
    }, function errorCallback(err) {
      console.log(err);
    });
  };

  $scope.show = function () {
    userApi.getUserId($scope.formData.id)
      .then(function (data, err) {
        if (err) {
          $scope.display = 'Sorry there is no users found';
        } else {
          UserService.setUser(data.data);
          $scope.foundPage($scope.formData.id);
        }
      });
  }



}]);

user.controller('getUserId', ['$scope', 'userApi', '$location', '$http', '$filter', 'UserService',function ($scope, userApi, $location, $http, $filter, UserService) {
  $scope.display = UserService.getUser();
}]);



// Configure routes
user.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './home.html',
      controller: 'getUser'
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
      controller: 'getUser'
    })
    .when('/user/findId', {
      templateUrl: './findUserById.html',
      controller: 'getUser'
    })
    .when('/user/:id', {
      templateUrl: './getUserId.html',
      controller: 'getUserId'
    });
});

// Factory
user.factory('userApi', ['$http', '$location', function ($http, $location) {
  return {
    getUser: function () {
      return $http.get('/user');
    },

    getUserId: function (id) {
      return $http.get('/user/'+id);
    },

    userLength: function (callback) {
      $http.get('/user')
        .then(function (data, err) {
          callback(data.data.length);
        });
    },
    //Redirect to home
    userPage: function () {
      return $location.path( '/user' );
    },
    //Redirect to the create page.
    createPage: function () {
      return $location.path( '/user/new' );
    },
    //Redirect to find id
    findPage: function (id) {
      return $location.path( '/user/findId' );
    },
    foundPage: function (id) {
      return $location.path( '/user/'+id );
    },
    //Redirect to the edit page
    editPage: function (id) {
      return $location.path( '/user/'+id+'/edit' );
    }
  };
}]);

// Services
user.service('UserService', function(){
  var editingUser;
  this.setUser = function(user){
    editingUser = user;
  };
  this.getUser = function(){
    return editingUser;
  }
});
