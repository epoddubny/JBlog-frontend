/**
 * Created by eugene on 06.12.15.
 */
'use strict'

angular.module('services').factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    };

    return auth;
});

angular.module('services')
    .factory('UserService', function($http, $httpParamSerializer) {
        return {
            logIn: function(email, password) {
                return $http({
                    url: 'oauth/token',
                    method: 'POST',
                    data: $httpParamSerializer({
                        grant_type:'password',
                        client_id: options.api.client_id,
                        client_secret: options.api.client_secret,
                        username: email,
                        password: password,
                        scope: options.api.scope
                    }),
                    headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
                });
            }
        }
    }).factory('ArticleService', function($http) {
           return {
               get: function(id) {
                   return $http.get(options.api.public_api + '/articles/' + id);
               },
               getPage: function(page) {
                   return  $http.get(options.api.public_api + '/articles?page=' + page + "&pageSize=" + options.page_size);
               }
           }
    }).factory('ArticleAdminService', function($http) {
        return {
            get: function(id) {
                return $http.get(options.api.private_api + '/articles/' + id);
            },
            getPage: function(page) {
                return  $http.get(options.api.private_api + '/articles?page=' + page + "&pageSize=" + options.page_size);
            },
            delete: function(id) {
                return $http.delete(options.api.private_api + '/articles/delete/' + id);
            },
            save: function(article) {
                return $http.post(options.api.private_api + '/articles/save', article);
            },
            update: function(article) {
                return $http.put(options.api.private_api + '/articles/update', article);
            }
        }
    }).factory('ContactsService', function($http) {
        return {
            get: function() {
                return  $http.get(options.api.public_api + '/contacts');
            }
        }
    });