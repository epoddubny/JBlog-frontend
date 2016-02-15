/**
 * Created by eugene on 06.12.15.
 */
'use strict'

angular.module('controllers').controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$filter',
    'UserService', 'AuthenticationService',
    function($scope, $rootScope, $window, $location, $filter, UserService, AuthenticationService) {

        $rootScope.title = $filter('translate')('LOGIN_TITLE');

        $scope.logIn = function(email, password) {
        if (email !== undefined && password !== undefined) {
            UserService.logIn(email, password).success(function(data) {
                AuthenticationService.isLogged = true;
                $window.sessionStorage.access_token = data.access_token;
                $window.sessionStorage.token_type = data.token_type;
                $window.sessionStorage.refresh_token = data.refresh_token;
                $window.sessionStorage.expires_in = data.expires_in;
                $window.sessionStorage.scope = data.scope;
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