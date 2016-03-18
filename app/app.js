/**
 * Created by eugene on 21.11.15.
 */
'use strict';
var angular = require('angular');
var marked = require('marked');
require('angular-dynamic-locale');
require('angular-route');
require('angular-resource');
require('angular-translate/angular-translate.min.js');
require('angular-translate-loader-static-files');
require('angular-sanitize');
require('angular-bootstrap');
require('highlightjs/highlight.pack.min.js');
require('angular-ui-notification');

angular.module('controllers', ['services']);
angular.module('services', []);
angular.module('interceptors', []);
angular.module('ngDisqus', []);

var options = {
    api: {
        client_id : "7b5a38705d7b3562655925406a652e32",
        client_secret: "655f523128212d6e70634446224c2a48",
        scope: "scoperead,write,trust",
        public_api: "api/public",
        private_api: "api/private"
    },
    page_size: "5"
};

/* App Module */
var jBlogApp = angular.module('jBlogApp', [
    'ngRoute', 'pascalprecht.translate', 'ngSanitize', 'ui.bootstrap', 'tmh.dynamicLocale', 'ui-notification', 'ngDisqus',
    'controllers', 'services', 'interceptors'
]);

require('./marked')(marked);
require('./disqus.js')(jBlogApp, window);
require('./interceptors.js')(jBlogApp, options);
require('./services.js')(jBlogApp, options);
require('./admin/articles/articles-list-controller.js')(jBlogApp, options);
require('./admin/articles/save-or-update-article-controller.js')(jBlogApp, options, marked);
require('./admin/contacts/contacts-controller.js')(jBlogApp);
require('./admin/profile/profile-controller.js')(jBlogApp);
require('./article/article-controller.js')(jBlogApp, options, marked);
require('./feedback/feedback-controller.js')(jBlogApp);
require('./fragments/footer-controller.js')(jBlogApp);
require('./login/login-controller.js')(jBlogApp);
require('./main/main-controller.js')(jBlogApp, options, marked);

require("../bower_components/bootstrap/dist/css/bootstrap.min.css");
require("../bower_components/highlightjs/styles/github.css");
require("../bower_components/angular-bootstrap/ui-bootstrap-csp.css");
require("../bower_components/angular-ui-notification/dist/angular-ui-notification.min.css");
require("../bower_components/font-awesome/css/font-awesome.min.css");
require("../resources/css/style.css");

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
        }).when('/admin/contacts', {
                templateUrl: 'app/admin/contacts/contacts.html',
                controller: 'ContactsController',
                access: { requiredLogin: true }
        }).when('/admin/profile', {
            templateUrl: 'app/admin/profile/profile.html',
            controller: 'ProfileController',
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
