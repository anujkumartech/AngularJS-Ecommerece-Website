
 
var myStoreModalController=angular.module("myStoreModalController",[]);

myStoreModalController.controller('ModalInstanceCtrl2',function($scope, $modalInstance, items){
 
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[2]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});





/*  
 This Defiantion Works 8 

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[2]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}; */

