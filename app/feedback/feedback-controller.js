/**
 * Created by eugene on 05.03.16.
 */
'use strict';


angular.module('controllers').controller('FeedbackController', ['$scope', '$rootScope', '$filter', '$route',
    'FeedbackService', 'Notification',
    function($scope, $rootScope, $filter, $route, FeedbackService, Notification) {

        $rootScope.title = $filter('translate')('FEEDBACK_TITLE');

        $scope.sendFeedback = function() {
            FeedbackService.send($scope.feedback).success(function(data) {
                Notification.success($filter('translate')('MESSAGE_SENT'));
                $route.reload();
            }).error(function(status, data) {
                Notification.error($filter('translate')('ERROR') + status);
            });
        };

    }]);
