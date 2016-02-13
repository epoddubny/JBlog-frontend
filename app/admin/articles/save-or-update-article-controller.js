/**
 * Created by eugene on 06.12.15.
 */
'use strict';

angular.module('controllers').controller('SaveOrUpdateArticleController', ['$scope', '$translate', '$routeParams',
    'tmhDynamicLocale', 'ArticleAdminService',
    function($scope, $translate, $routeParams, tmhDynamicLocale, ArticleAdminService) {
        tmhDynamicLocale.set($translate.use());

        $scope.popup = {
            opened: false
        };

        $scope.article = {
            hashtags: []
        };

        $scope.articleId = $routeParams.id;

        if ($scope.articleId != undefined) {
            ArticleAdminService.get($scope.articleId).success(function(data) {
                $scope.article = data;
            });
        }

        $scope.$watch('article.preview', function(preview) {
            $scope.preview = marked((preview || '') + '<br/>' + ($scope.article.text || ''));
        });

        $scope.$watch('article.text', function(text) {
            $scope.preview = marked(($scope.article.preview || '') + '<br/>' + (text || ''));
        });

        $scope.addHashTag = function() {
            if ($scope.hashtag == undefined)
                return;
            $scope.article.hashtags.push($scope.hashtag);
            $scope.hashtag = null;
        };

        $scope.deleteHashTag = function(hashtag) {
            var tagIndex = $scope.article.hashtags.indexOf(hashtag);
            $scope.article.hashtags.splice(index, 1);
        };

        $scope.saveOrUpdateArticle = function() {
            if ($scope.article.id == undefined) {
                ArticleAdminService.save($scope.article);
            }
        }
}]);
