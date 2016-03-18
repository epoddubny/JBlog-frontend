/**
 * Created by eugene on 24.01.16.
 */
'use strict';

module.exports = function(jBlogApp, options) {
    jBlogApp.controller('ArticlesListController', ['$scope', '$rootScope', '$filter', '$translate',
        'Notification', 'ArticleAdminService',
        function ($scope, $rootScope, $filter, $translate, Notification, ArticleAdminService) {

            $translate('ARTICLES_LIST_TITLE').then(function (translatedValue) {
                $rootScope.title = translatedValue;
            });

            $scope.pageSize = options.page_size;

            $scope.currentPageNumber = 1;

            $scope.pageChanged = function () {
                if ($scope.currentPageNumber != undefined) {
                    ArticleAdminService.getPage($scope.currentPageNumber).success(function (data) {
                        $scope.currentPage = data;
                    }).error(function (data, status) {
                        Notification.error($filter('translate')('ERROR'));
                        console.log(status);
                        console.log(data);
                    });
                }
            };

            $scope.deleteArticle = function (id) {
                if (id != undefined) {
                    ArticleAdminService.delete(id).success(function (data) {
                        $scope.currentPageNumber = 1;
                        $scope.pageChanged();
                        Notification.success($filter('translate')('DELETED'));
                    }).error(function (data, status) {
                        Notification.error($filter('translate')('ERROR'));
                        console.log(status);
                        console.log(data);
                    });
                }
            };

            $scope.pageChanged();

        }]);
};
