/**
 * Created by eugene on 06.03.16.
 */
'use strict';

angular.module('controllers').controller('ContactsController', ['$scope', '$rootScope', '$filter', '$translate',
    'Notification', 'ContactsService', 'ContactsAdminService',
    function($scope, $rootScope, $filter, $translate, Notification, ContactsService, ContactsAdminService) {

        $translate('CONTACTS_UPDATE_TITLE').then(function (translatedValue) {
            $rootScope.title = translatedValue;
        });

        var getContacts = function() {
            ContactsService.get().success(function(data) {
                $scope.contacts = data;
                console.log($scope.contacts);
            }).error(function(data, status) {
                Notification.error($filter('translate')('ERROR'));
                console.log(status);
                console.log(data);
            });
        };

        $scope.saveContacts = function() {
            ContactsAdminService.save($scope.contacts).success(function() {
                Notification.success($filter('translate')('SAVED'));
                $location.path("/admin/contacts");
            }).error(function(data, status) {
                Notification.error($filter('translate')('ERROR'));
                console.log(status);
                console.log(data);
            });
        };

        getContacts();

    }]);
