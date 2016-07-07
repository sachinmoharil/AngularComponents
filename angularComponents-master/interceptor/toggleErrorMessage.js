/*global define */

'use strict';
/*
 * define require js module
 */
define(['angular'], function(angular) {

    /* attach directive into angular directives module */
    angular.module('directives').directive('toggleError',['$http','$compile','$location',
        function($http,$compile,$location) {
        return {
            restrict: 'E',
            scope: {errorField: '=', errorMessage: '='},
            controller: function($scope, $element,$rootScope,$route){
                $scope.reloadHome = function(e){
                    e.preventDefault();

                    $rootScope.errorField = false;
                    $route.reload();
                };
                $scope.closeMess = function(){
                    $rootScope.errorField = false;
                };
            },
            template: '<div class="alert alert-danger errAnimate" ng-show="errorField" style="margin-top:15px">' +
                        '<button type="button" class="close" data-dismiss="alert" ng-click="closeMess()">×</button>' +
                        '<h4 class="alert-heading">The system encountered error(s)!</h4>' +
                        '<p><i>{{ errorMessage }}</i></p>'+
                        '<p>Please click <a href="#" ng-click="reloadHome($event)">here</a> to go home.</p>'+
                      '</div>',
            replace: true
        };
    }]);
});


