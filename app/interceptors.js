/**
 * Created by eugene on 26.01.16.
 */
'use strict'

angular.module('interceptors').factory('TokenInterceptor', function($window) {
    return {
        'request': function(config) {
            var url = config.url;
            if (url.indexOf(options.api.private_api) == 0) {
                if (url.indexOf('?') != -1)
                    url += '&';
                else
                    url += '?';
                config.url = url + "access_token=" + $window.sessionStorage.access_token;
            }
            return config;
        }
    };
});
