
 
var myStoreModalItemController=angular.module("myStoreModalItemController",[]);

myStoreModalItemController.controller('ItemModal',function($scope, $modalInstance, items,Product,show){
 
  $scope.itemId = items;

  $scope.addToCartShow=show;

  var fileId='id'+items;

  $scope.details=Product.getProduct({file:fileId});

  var currentProduct=$scope.details;

  $scope.ok = function () {
    $modalInstance.close(currentProduct);
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

