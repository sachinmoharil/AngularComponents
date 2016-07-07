/**
 * Created by sissr01 on 2/5/15.
 */
'use strict';
// DEFINE AN ANGULAR MODULE FOR DIRECTIVE
angular.module('catalog.directives')
    .directive('checkValue',function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var validate = function(viewValue){
                    var comparisonModel = attrs.checkValue;
                    if(typeof(viewValue) !== 'undefined'){
                        ctrl.$setValidity('checkValue', (parseFloat(viewValue) >= parseFloat(comparisonModel)));

                        return viewValue;
                    }
                };

                ctrl.$parsers.unshift(validate);
                ctrl.$formatters.push(validate);

                attrs.$observe('checkValue', function(comparisonModel){
                    return validate(ctrl.$viewValue);
                });
            }
        };
    });