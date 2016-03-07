/**
 * Created by eugene on 06.03.16.
 */
'use strict';

angular.module('controllers').controller('ContactsController', ['$scope', '$rootScope', '$filter', 'Notification',
    'ContactsService', 'ContactsAdminService',
    function($scope, $rootScope, $filter, Notification, ContactsService, ContactsAdminService) {

        $rootScope.title = $filter('translate')('CONTACTS_UPDATE_TITLE');

        var getContacts = function() {
            ContactsService.get().success(function(data) {
                $scope.contacts = data;
                console.log($scope.contacts);
            }).error(function(status, data) {
                Notification.error($filter('translate')('ERROR') + status);
            });
        };

        $scope.saveContacts = function() {
            ContactsAdminService.save($scope.contacts).success(function() {
                Notification.success($filter('translate')('SAVED'));
                $location.path("/admin/contacts");
            }).error(function(status, data) {
                Notification.error($filter('translate')('ERROR') + status);
            });
        };

        getContacts();

    }]);
