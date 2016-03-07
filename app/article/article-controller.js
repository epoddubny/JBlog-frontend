/**
 * Created by eugene on 30.12.15.
 */
'use strict';

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

                    $rootScope.title = $scope.article.title;

                }).error(function(data, status) {
                    Notification.error($filter('translate')('ERROR'));
                    console.log(status);
                    console.log(data);
                });
            }
        };

        $scope.markText = function(text) {
            return marked(text || '');
        };

        $scope.getArticle($scope.articleId);

    }]);
