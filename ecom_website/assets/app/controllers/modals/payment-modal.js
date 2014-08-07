
 
var myStorePaymentModalController=angular.module("myStorePaymentModalController",[]);

myStorePaymentModalController.controller('myStorePaymentModalCtrl',function($scope, $modalInstance,paymentInfo){
  
  $scope.paymentInfo=paymentInfo;


  $scope.ok = function () {
    console.log($scope.paymentInfo[1]);    
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
	window.location.href = "#/viewproduct";
  };

  $scope.printOrder=function(){
    window.print();
    $modalInstance.close();
  };

});



