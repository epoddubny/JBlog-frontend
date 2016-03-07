/**
 * Created by eugene on 21.11.15.
 */
'use strict';

angular.module('controllers').controller('MainController', ['$scope', '$rootScope', '$filter', '$routeParams', '$location',
    '$translate', 'Notification', 'ArticleService',

    function($scope, $rootScope, $filter, $routeParams, $location, $translate, Notification, ArticleService) {

        $translate('MAIN_TITLE').then(function (translatedValue) {
            $rootScope.title = translatedValue;
        });

        $scope.pageSize = options.page_size;

        $scope.currentPageNumber = $routeParams.pageNumber || 1;

        $scope.pageChanged = function() {
            if ($scope.currentPageNumber == 1)
                $location.path("/");
            else
                $location.path("/page/" + $scope.currentPageNumber);
        };

        $scope.markText = function(text) {
            return marked(text || '');
        };

        ArticleService.getPage($scope.currentPageNumber).success(function(data) {
            $scope.currentPage = data;
        }).error(function(data, status) {
            Notification.error($filter('translate')('ERROR'));
            console.log(status);
            console.log(data);
        });

    }]);
