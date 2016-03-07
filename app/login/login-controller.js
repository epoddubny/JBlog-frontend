/**
 * Created by eugene on 06.12.15.
 */
'use strict';

angular.module('controllers').controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$filter',
    '$translate', 'UserService',
    function($scope, $rootScope, $window, $location, $filter, $translate, UserService) {

        $translate('LOGIN_TITLE').then(function (translatedValue) {
            $rootScope.title = translatedValue;
        });

        $scope.logIn = function(email, password) {
        if (email !== undefined && password !== undefined) {
            UserService.logIn(email, password).success(function(data) {
                $window.localStorage.setItem('token', data.access_token);
                $location.path("/admin/articles");
            }).error(function(data, status) {
                $scope.errorMessage = data.error_description;
                $scope.errorClass = 'has-error';
                console.log(status);
                console.log(data);
            });
        }
    }
}]);