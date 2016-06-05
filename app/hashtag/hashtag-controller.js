'use strict';
module.exports = function(jBlogApp, options, marked) {
    jBlogApp.controller('HashtagController', ['$scope', '$rootScope', '$filter', '$routeParams', '$location',
        '$translate', 'Notification', 'ArticleService',

        function ($scope, $rootScope, $filter, $routeParams, $location, $translate, Notification, ArticleService) {

            $scope.pageSize = options.page_size;

            $scope.currentPageNumber = $routeParams.pageNumber || 1;

            $scope.hashtag = $routeParams.hashtag;

            $rootScope.title = $scope.hashtag;

            $scope.pageChanged = function () {
                if ($scope.currentPageNumber == 1)
                    $location.path("/tags/" + $scope.hashtag);
                else
                    $location.path("/tags/" + $scope.hashtag + "/page/" + $scope.currentPageNumber);
            };

            $scope.markText = function (text) {
                return marked(text || '');
            };

            ArticleService.getHashtagPage($scope.hashtag, $scope.currentPageNumber).success(function (data) {
                $scope.currentPage = data;
            }).error(function (data, status) {
                Notification.error($filter('translate')('ERROR'));
                console.log(status);
                console.log(data);
            });

        }]);
};
