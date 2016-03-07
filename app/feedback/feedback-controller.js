/**
 * Created by eugene on 05.03.16.
 */
'use strict';


angular.module('controllers').controller('FeedbackController', ['$scope', '$rootScope', '$filter', '$translate', '$route',
    'FeedbackService', 'Notification',
    function($scope, $rootScope, $filter, $translate, $route, FeedbackService, Notification) {

        $translate('FEEDBACK_TITLE').then(function (translatedValue) {
            $rootScope.title = translatedValue;
        });

        $scope.sendFeedback = function() {
            FeedbackService.send($scope.feedback).success(function(data) {
                Notification.success($filter('translate')('MESSAGE_SENT'));
                $route.reload();
            }).error(function(data, status) {
                Notification.error($filter('translate')('ERROR'));
                console.log(status);
                console.log(data);
            });
        };

    }]);
