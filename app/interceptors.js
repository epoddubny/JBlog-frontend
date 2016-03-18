/**
 * Created by eugene on 26.01.16.
 */
'use strict';
module.exports = function(jBlogApp, options) {
    jBlogApp.factory('TokenInterceptor', function ($window, $q, $location) {
        return {
            request: function (config) {
                var url = config.url;
                if (url.indexOf(options.api.private_api) == 0) {
                    if (url.indexOf('?') != -1)
                        url += '&';
                    else
                        url += '?';
                    config.url = url + "access_token=" + $window.localStorage.getItem('token');
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && $window.localStorage.getItem('token')) {
                    $window.localStorage.removeItem('token');
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    });
};
