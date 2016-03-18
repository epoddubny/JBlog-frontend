/**
 * Created by eugene on 09.01.16.
 */
'use strict';
module.exports = function(jBlogApp) {
    jBlogApp.controller('FooterController', ['$scope', 'ContactsService',
        function ($scope, ContactsService) {
            $scope.getContacts = function () {
                ContactsService.get().success(function (data) {
                    $scope.contacts = data;
                }).error(function (data, status) {
                    $scope.contacts = {
                        'email': '#',
                        'vk': '#',
                        'skype': '#'
                    };
                    console.log(status);
                    console.log(data);
                });
            };

            $scope.getContacts();
        }]);
};