/**
 * Created by eugene on 21.11.15.
 */
'use strict';

angular.module('controllers', ['services']);
angular.module('services', []);
angular.module('interceptors', []);

/* App Module */
var jBlogApp = angular.module('jBlogApp', [
   'ngRoute', 'pascalprecht.translate', 'ngSanitize', 'ui.bootstrap', 'tmh.dynamicLocale', 'ui-notification', 'ngDisqus',
    'controllers', 'services', 'interceptors'
]);


var options = {};
options.api = {};
options.api.client_id  = "7b5a38705d7b3562655925406a652e32";
options.api.client_secret = "655f523128212d6e70634446224c2a48";
options.api.scope = "scoperead,write,trust";
options.api.public_api = "api/public";
options.api.private_api = "api/private";
options.page_size = 5;

jBlogApp.config(['$routeProvider','$locationProvider', '$translateProvider', '$disqusProvider', '$compileProvider',
    '$httpProvider', 'tmhDynamicLocaleProvider', 'NotificationProvider',
    function($routeProvider, $locationProvider, $translateProvider, $disqusProvider, $compileProvider, $httpProvider,
             tmhDynamicLocaleProvider, NotificationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            access: { requiredLogin: false }
        }).when('/page/:pageNumber', {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            access: { requiredLogin: false }
        }).when('/article/:id', {
            templateUrl: 'app/article/article.html',
            controller: 'ArticleController',
            access: { requiredLogin: false }
        }).when('/feedback', {
            templateUrl: 'app/feedback/feedback.html',
            controller: 'FeedbackController',
            access : { requiredLogin: false }
        }).when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            access: { requiredLogin: false }
        }).when('/admin/article', {
            templateUrl: 'app/admin/articles/save-or-update-article.html',
            controller: 'SaveOrUpdateArticleController',
            access: { requiredLogin: true }
        }).when('/admin/article/:id', {
            templateUrl: 'app/admin/articles/save-or-update-article.html',
            controller: 'SaveOrUpdateArticleController',
            access: { requiredLogin: true }
        }).when('/admin/articles', {
            templateUrl: 'app/admin/articles/articles-list.html',
            controller: 'ArticlesListController',
            access: { requiredLogin: true }
        }).otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode({
            enabled: true
        });

        $translateProvider.preferredLanguage('ru');

        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/i18n/',
            suffix: '.json'
        });

        $disqusProvider.setShortname('myjblogtest');

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);

        tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');

        $httpProvider.interceptors.push('TokenInterceptor');

        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });

}]).run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !$window.localStorage.getItem('token')) {
            $location.path("/login");
        }
    });
});
