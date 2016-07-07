/*global define */

'use strict';
/*
 * define require js module
 */
define(['angular'], function(angular) {

    /* attach directive into angular directives module */
    angular.module('directives').directive('toggleSuccess',function() {
        return {
            restrict: 'E',
            scope: {successField: '=', successMessage: '='},
            controller: function($scope, $element,$rootScope,$route){
            },
            template: '<div class="alert alert-success errAnimate" ng-show="successField" style="margin-top:15px">'+
                        '<h4 class="alert-heading" style="display: inline-block"><i class="icon-ok"></i>{{ successMessage }}</h4>'+
                      '</div>',
            replace: true
        };
    });
});