/**
 * Created by eugene on 06.12.15.
 */
'use strict';
module.exports = function(jBlogApp, options, marked) {
    jBlogApp.controller('SaveOrUpdateArticleController', ['$scope', '$rootScope', '$translate',
        '$routeParams', '$filter', '$location', 'tmhDynamicLocale', 'Notification', 'ArticleAdminService',
        function ($scope, $rootScope, $translate, $routeParams, $filter, $location, tmhDynamicLocale, Notification, ArticleAdminService) {
            tmhDynamicLocale.set($translate.use());

            $scope.popup = {
                opened: false
            };

            $scope.article = {
                hashtags: []
            };

            $scope.articleId = $routeParams.id;

            if ($scope.articleId != undefined) {

                $translate('ARTICLE_UPDATE_TITLE').then(function (translatedValue) {
                    $rootScope.title = translatedValue;
                });

                ArticleAdminService.get($scope.articleId).success(function (data) {
                    $scope.article = data;
                }).error(function (data, status) {
                    Notification.error($filter('translate')('ERROR'));
                    console.log(status);
                    console.log(data);
                });
            } else {
                $translate('ARTICLE_ADD_TITLE').then(function (translatedValue) {
                    $rootScope.title = translatedValue;
                });
            }

            $scope.saveOrUpdateArticle = function () {
                if ($scope.article.id == undefined) {
                    ArticleAdminService.save($scope.article).success(function (data) {
                        Notification.success($filter('translate')('SAVED'));
                        redirectToArticlesPage();
                    }).error(function (data, status) {
                        Notification.error($filter('translate')('ERROR'));
                        console.log(status);
                        console.log(data);
                    });
                } else {
                    ArticleAdminService.update($scope.article).success(function (data) {
                        Notification.success($filter('translate')('UPDATED'));
                        redirectToArticlesPage();
                    }).error(function (data, status) {
                        Notification.error($filter('translate')('ERROR') + status);
                        console.log(status);
                        console.log(data);
                    });
                }
            };

            $scope.$watch('article.preview', function (preview) {
                $scope.preview = marked(preview || '');
            });

            $scope.$watch('article.text', function (text) {
                $scope.text = marked(text || '');
            });

            $scope.addHashTag = function () {
                if ($scope.hashtag == undefined || getHashTagIndex($scope.hashtag) != -1) {
                    $scope.hashtag = null;
                    return;
                }
                $scope.article.hashtags.push($scope.hashtag);
                $scope.hashtag = null;
            };

            $scope.deleteHashTag = function (hashtag) {
                var tagIndex = getHashTagIndex(hashtag);
                $scope.article.hashtags.splice(tagIndex, 1);
            };

            var getHashTagIndex = function (hashtag) {
                return $scope.article.hashtags.indexOf(hashtag);
            };

            var redirectToArticlesPage = function () {
                $location.path("/admin/articles");
            }

        }]);
};
