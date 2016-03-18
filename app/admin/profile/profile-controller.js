/**
 * Created by eugene on 07.03.16.
 */
'use strict';


angular.module('controllers').controller('ProfileController', ['$scope', '$rootScope', '$filter', '$translate',
    'ProfileAdminService', 'Notification',
    function($scope, $rootScope, $filter, $translate, ProfileAdminService, Notification) {

        $translate('PROFILE_TITLE').then(function (translatedValue) {
            $rootScope.title = translatedValue;
        });

        var getProfile = function() {
            ProfileAdminService.get().success(function(data) {
                $scope.profile = data;
            }).error(function(data, status) {
                Notification.error($filter('translate')('ERROR'));
                console.log(status);
                console.log(data);
            });
        };

        $scope.updateProfile = function() {
            ProfileAdminService.update($scope.profile).success(function(data) {
                Notification.success($filter('translate')('UPDATED'));
            }).error(function(data, status) {
                Notification.error($filter('translate')('ERROR') + data);
                console.log(status);
                console.log(data);
            });
        };

        getProfile();

    }]);