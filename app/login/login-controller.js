/**
 * Created by eugene on 06.12.15.
 */
'use strict';

angular.module('controllers').controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$filter',
    'UserService',
    function($scope, $rootScope, $window, $location, $filter, UserService) {

        $rootScope.title = $filter('translate')('LOGIN_TITLE');

        $scope.logIn = function(email, password) {
        if (email !== undefined && password !== undefined) {
            UserService.logIn(email, password).success(function(data) {
                $window.localStorage.setItem('token', data.access_token);
                $location.path("/admin/articles");
            }).error(function(status, data) {
                $scope.errorMessage = status.error_description;
                $scope.errorClass = 'has-error';
                console.log(status);
                console.log(data);
            });
        }
    }
}]);