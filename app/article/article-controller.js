/**
 * Created by eugene on 30.12.15.
 */
'use strict'

angular.module('controllers').controller('ArticleController', ['$scope', '$rootScope', '$filter', '$location',
    '$translate', '$routeParams', 'ArticleService',
    function($scope, $rootScope, $filter, $location, $translate, $routeParams, ArticleService) {
        $scope.articleId = $routeParams.id;

        $scope.getArticle = function(id) {
            if (id != undefined) {
                ArticleService.get(id).success(function(data) {
                    $scope.article = data;
                    $scope.disqusParameters = {
                        'id' : data.id,
                        'url': $location.absUrl(),
                        'title': data.title,
                        'lang': $translate.preferredLanguage()
                    };
                    $scope.updateTitle($scope.article.title);
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };

        $scope.updateTitle = function(title) {
            $rootScope.title = {
                value: title
            }
        };

        $scope.getArticle($scope.articleId);

    }]);
