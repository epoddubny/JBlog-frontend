/**
 * Created by eugene on 24.01.16.
 */
'use strict'

angular.module('controllers').controller('ArticlesListController', ['$scope', '$rootScope', '$filter', 'ArticleAdminService',
    function($scope, $rootScope, $filter, ArticleAdminService) {

        $rootScope.title = {
            value: $filter('translate')('ARTICLES_LIST_TITLE')
        };

        $scope.pageSize = options.page_size;

        $scope.currentPageNumber = 1;

        $scope.pageChanged = function() {
            if ($scope.currentPageNumber != undefined) {
                ArticleAdminService.getPage($scope.currentPageNumber).success(function(data) {
                    $scope.currentPage = data;
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };

        $scope.deleteArticle = function(id) {
          if (id != undefined) {
              ArticleAdminService.delete(id).success(function(data) {
                  $scope.currentPageNumber = 1;
                  $scope.pageChanged();
              });
          }
        };

        $scope.pageChanged();

    }]);