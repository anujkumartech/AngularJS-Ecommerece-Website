var myStorePaymentControllers=angular.module("myStorePaymentControllers",['ui.bootstrap',
                                                                           'myStorePaymentModalController' 
                                                                         ]);

myStorePaymentControllers.controller('myStorePaymentCtrl',function($scope,$modal,$log,Product,User,Cart,Checkout,Payment){


	$scope.paymentDetails=Payment.getPaymentDetails();
	//console.log($scope.paymentDetails);
	$scope.creaditCard=[];
    $scope.expirayDate=[];

    $scope.warningMessage="Click Below When Ready"


	//$scope.paymentDetails[2]=40;

    /*
	$scope.$watchCollection('creaditCard',function(newVal,oldVal){
		//console.log(newVal);
		//console.log(oldVal);
		var elemID;
		for(x in newVal){
			//console.log(newVal[x] + " is element id");
			var y=parseInt(x)+1;
			elemID='creaditCard'+(parseInt(x)+1);
			console.log(elemID);
			break;
		}

		var check='#'+elemID;
		console.log(check);
			
		console.log((angular.element("#creaditCard"+1).val()));
	});
    */

    $scope.makePayment=function(){
        var validated=false;;
        if($scope.creaditCard[0]>1000){
            if($scope.creaditCard[1]>1000){
                if($scope.creaditCard[2]>1000){
                    if($scope.creaditCard[3]>1000){
                        
                        if($scope.expirayDate[0]&&$scope.expirayDate[1]){
                            validated=true;
                            $scope.warningMessage="Valid Creadit Card"
                        }
                        else{
                            $scope.warningMessage="Please Enter Valid Expiray Date"
                        }
                    }
                    else{
                        $scope.warningMessage="Please Enter Valid Credit Card. Error Detected in field 4"
                    }
                }   
                else{
                    $scope.warningMessage="Please Enter Valid Credit Card. Error Detected in field 3"
                }
            }    
            else{
                $scope.warningMessage="Please Enter Valid Credit Card. Error Detected in field 2"
            }
        }     
        else{
            $scope.warningMessage="Please Enter Valid Credit Card. Error Detected in field 1";          
        } 

        if(validated){
            //alert("Payment Received");
            $scope.openPaymentModel();

        }
    };


    $scope.openPaymentModel = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'assets/app/views/paymentModal.html',
            controller: 'myStorePaymentModalCtrl',
            size: size,
            resolve: {
                paymentInfo: function () {
                    return $scope.paymentDetails;
                }

            }       
        });

        modalInstance.result.then(function (selectedItem) {
            //$scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
        });
    };

 });      
       
        

    




myStorePaymentControllers.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                ngModel.$viewValue = digits;
                ngModel.$render();
                return digits;
            });
        }
    };
});

myStorePaymentControllers.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
            	//console.log(_element);
                _element[0].focus();
            }, 0);
        }
    };
});