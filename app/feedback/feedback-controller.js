/**
 * Created by eugene on 05.03.16.
 */
'use strict';


angular.module('controllers').controller('FeedbackController', ['$scope', '$rootScope', '$filter', 'FeedbackService',
    'Notification',
    function($scope, $rootScope, $filter, FeedbackService, Notification) {

        $rootScope.title = $filter('translate')('FEEDBACK');

        $scope.sendFeedback = function() {
            FeedbackService.send($scope.feedback).success(function(data) {
                Notification.success($filter('translate')('MESSAGE_SENT'));
                $scope.feedback = {};
            }).error(function(status, data) {
                Notification.error($filter('translate')('ERROR') + status);
            });
        };

    }]);
