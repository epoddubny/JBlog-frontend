/**
 * Created by eugene on 30.12.15.
 */
'use strict'

angular.module('controllers').controller('ArticleController', ['$scope', '$rootScope', '$filter', '$location',
    '$translate', '$routeParams', 'Notification', 'ArticleService',
    function($scope, $rootScope, $filter, $location, $translate, $routeParams, Notification, ArticleService) {
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
                    Notification.error($filter('translate')('ERROR') + status);
                });
            }
        };

        $scope.markText = function(text) {
            return marked(text || '');
        };

        $scope.updateTitle = function(title) {
            $rootScope.title = {
                value: title
            }
        };

        $scope.getArticle($scope.articleId);

    }]);
