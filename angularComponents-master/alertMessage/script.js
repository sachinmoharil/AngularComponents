// Code goes here

angular.module('myApp',['ui.bootstrap'])
.controller('myController',['$scope','$window','$modal','$log',
function($scope,$window,$modal,$log){
  $scope.myForm = {};
  $scope.abc = '';
  // FOLLOWING WITH OPEN NATIVE BROWSER'S ALERT
  $window.onbeforeunload = function(event) {
      if ($scope.myForm.form.$dirty) {
          event = $window.event;
          if (event) {
              event.returnValue = 'There are some unsaved changes. Sure you want to leave?';
          }
          return 'There are some unsaved changes. Sure you want to leave?';
      }
  };

  /*$scope.$on('$locationChangeStart', function(event) {
      // if modal instance difined, dismiss window
      if ($scope.modalInstance) {
          $scope.modalInstance.close('cancel');
      }

      if($scope.myForm.form.$dirty){
          event.preventDefault();

          $scope.modalInstance = $modal.open({ templateUrl: 'modal.html', backdrop: 'static' });
          $scope.modalInstance.result.then(function() {
              // IF ELSE STATEMENT BASED ON REQUIREMENTS
              if{}
              else{
                  $window.history.back();
              }
              // SET ALL FORMS TO PRISTINE STATE

              return true;
          });
      }
  });*/

}]);