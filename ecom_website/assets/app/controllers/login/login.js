var myStoreLogin=angular.module("myStoreLoginController",['myStoreUserService','demoControllerModule']);

myStoreLogin.controller('myStoreLoginCtrl',function($scope,User){


$scope.validateUser=function(){

  if($scope.pass != undefined && $scope.userName !== undefined){
    		
    var isFound=User.getUserPassword($scope.userName.toLowerCase(),$scope.pass);

    if(isFound[0]){       
        alert(isFound[1]);
        User.login();	
        window.location.href = "#/viewproduct";
        $scope.isAuth = User.isAuthenticated();
        }

    else{
        alert(isFound[1]);
       } 
     	
  }
}


});