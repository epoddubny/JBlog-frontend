/**
 * Created by eugene on 06.12.15.
 */
'use strict';

angular.module('controllers').controller('SaveOrUpdateArticleController', ['$scope', '$rootScope', '$translate',
    '$routeParams', '$filter', '$location', 'tmhDynamicLocale', 'Notification', 'ArticleAdminService',
    function($scope, $rootScope, $translate, $routeParams, $filter, $location, tmhDynamicLocale, Notification, ArticleAdminService) {
        tmhDynamicLocale.set($translate.use());

        $scope.popup = {
            opened: false
        };

        $scope.article = {
            hashtags: []
        };

        $scope.articleId = $routeParams.id;

        if ($scope.articleId != undefined) {
            $rootScope.title = {
                value: $filter('translate')('ARTICLE_UPDATE_TITLE')
            };
            ArticleAdminService.get($scope.articleId).success(function(data) {
                $scope.article = data;
            }).error(function(status, data) {
                Notification.error($filter('translate')('ERROR') + status);
                console.log(status);
                console.log(data);
            });
        } else {
            $rootScope.title = {
                value: $filter('translate')('ARTICLE_ADD_TITLE')
            };
        }

        $scope.$watch('article.preview', function(preview) {
            $scope.preview = marked((preview || '') + '<br/>' + ($scope.article.text || ''));
        });

        $scope.$watch('article.text', function(text) {
            $scope.preview = marked(($scope.article.preview || '') + '<br/>' + (text || ''));
        });

        $scope.addHashTag = function() {
            if ($scope.hashtag == undefined || getHashTagIndex($scope.hashtag) != -1) {
                $scope.hashtag = null;
                return;
            }
            $scope.article.hashtags.push($scope.hashtag);
            $scope.hashtag = null;
        };

        $scope.deleteHashTag = function(hashtag) {
            var tagIndex = getHashTagIndex(hashtag);
            $scope.article.hashtags.splice(tagIndex, 1);
        };

        var getHashTagIndex = function(hashtag) {
            return $scope.article.hashtags.indexOf(hashtag);
        };

        $scope.saveOrUpdateArticle = function() {
            if ($scope.article.id == undefined) {
                ArticleAdminService.save($scope.article).success(function(data) {
                    Notification.success($filter('translate')('SAVED'));
                    $location.path("/admin/articles");
                }).error(function(status, data) {
                    Notification.error($filter('translate')('ERROR') + status);
                    console.log(status);
                    console.log(data);
                });
            }
        }
}]);
