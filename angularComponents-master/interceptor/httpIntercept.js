
/** global angular, require */
'use strict';

    /**
     * INTERCEPTOR definition
     */
    var httpIntercept = angular.module('httpIntercept', []);

    /**
     * INTERCEPTOR Config
     */
    httpIntercept.config(function ($provide,$httpProvider, $compileProvider, $logProvider) {
        $logProvider.debugEnabled(false);
        $httpProvider.interceptors.push('httpInterceptor');

    }).factory('httpInterceptor',function($q,$rootScope,$injector,$timeout,$location, $window){
        $rootScope.pendingRequests = 0;
        var $http,rootScope,timeout,location;
        return {
            'request': function (config) {
                $rootScope.pendingRequests++;
                return config || $q.when(config);
            },

            'requestError': function(rejection) {
                $rootScope.pendingRequests--;
                return $q.reject(rejection);
            },

            'response': function(response) {
                // AVOID CIRCULAR DEPENDECY
                $http = $http || $injector.get('$http');
                rootScope = rootScope || $injector.get('$rootScope');
                timeout = timeout || $injector.get('$timeout');
                rootScope.errorField = false;

                return response || $q.when(response);
            },

            // HANDLE THE RESPONSE ERRORS BASED ON STATUS CODE
            'responseError': function(rejection) {
                // AVOID CIRCULAR DEPENDECY
                $http = $http || $injector.get('$http');
                rootScope = rootScope || $injector.get('$rootScope');
                timeout = timeout || $injector.get('$timeout');
                location = location || $injector.get('$location');
                switch (rejection.status) {
                    case 401:
                    case 403:	
                    {
                        rootScope.errorField = true;
                        rootScope.errorMessage = (rejection.data.error || 'Your Session Timed Out. Please re log!');
                        return $q.defer().promise.then(function() {
                            return $http(rejection.config);
                        });
                    }
                        break;
                    case 400:
                    {
                        rootScope.errorField = true;
                        rootScope.errorMessage = (rejection.data.error || 'Bad request made to the API!');
                        return $q.defer().promise.then(function() {
                            return $http(rejection.config);
                        });
                    }
                        break;
                    case 404:
                        {
                            rootScope.errorField = true;
                            rootScope.errorMessage = (rejection.data.statusMessage || 'The requested data not found!');

                            return $q.defer().promise.then(function() {
                                return $http(rejection.config);
                            });
                        }
                        break;
                    case 500:
                        {
                            rootScope.errorField = true;
                            rootScope.errorMessage = (rejection.data.statusMessage || 'The system encountered an error!');

                            return $q.defer().promise.then(function() {
                                return $http(rejection.config);
                            });
                        }
                        break;
                    case 0:
                    	{
                    	 $window.location.reload();
                    	 break;
                    	}                  

                    default:
                        {
                            rootScope.errorField = true;
                            rootScope.errorMessage = ('Error ' + ( rejection.data.statusCode || '' ) + ': ' +
                            ( rejection.data.statusMessage || 'Something went wrong' ));
                        }
                }
                return $q.reject(rejection);
            }
        };
});
    
