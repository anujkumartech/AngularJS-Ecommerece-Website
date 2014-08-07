var myStoreHomeController=angular.module("myStoreHomeController",['myStoreModalItemController','myStoreLoginController']);

myStoreHomeController.controller('myStoreHomeCtrl',function($scope,$modal){


//Corousal Related Configuration
$scope.myInterval = 3000;

var slides = $scope.slides = [];

$scope.addSlide = function(index) {
     slides.push({
      image: 'assets/app/data/image/'+index+'.jpg',
  });
};

for (var i=0; i<5; i++) {
	$scope.addSlide(i);
};

  //Show Product Information but not allow to buy it
  $scope.openProductMain=function(itemId){

    var itemUrl=itemId;
    var homeProductModel=$modal.open({
      templateUrl: 'assets/app/views/itemModal.html',
      controller: 'ItemModal',
      //size: size,
      resolve: {
        items: function () {
          return itemUrl;
        },
        show : function() {
          return false;
        }
      }

  }); 

      homeProductModel.result.then(function (selectedItem) {
      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
};



//Login Content Related Defination 
$scope.loginButton="Login";
$scope.userNeedsLogin=false;
$scope.loginPopOverMessage="Login In You Account";

$scope.userLogin=function(){
  $scope.userNeedsLogin=!$scope.userNeedsLogin;
  if($scope.userNeedsLogin){
    $scope.loginButton="Fill Details Below";
    $scope.loginPopOverMessage="";
  }  
  else{
    $scope.loginButton="Login";
    $scope.loginPopOverMessage="Login In You Account";
  }
}




});
