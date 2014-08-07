var myStoreCheckoutControllers=angular.module("myStoreCheckoutControllers",['myStorePaymentControllers']);

myStoreCheckoutControllers.controller('myStoreCheckoutCtrl',function($scope,$modal,$log,Product,User,Cart,Checkout,Payment){

	
	$scope.states=[];
	$scope.sameShippingBillingAddress;
	$scope.shippingAddress={};
	$scope.billingAddress={};
	$scope.shippingAddress.state="";

	$scope.cartTotalItems=Cart.getCartConsilidatedData();
	$scope.cartTotalItemCount=Cart.getTotalNumberOfItem();
	$scope.currentTotal=Cart.getCurrentTotal();

	var oldShippingAddress={};

	$scope.tax=0;

	$scope.totalAmount=$scope.currentTotal+$scope.tax;
	
	/*
	$scope.saleTaxMaster=Checkout.getSalexTax((function(){
		//console.log($scope.saleTaxMaster);
		getStates();
	}));

	*/

	Checkout.getSalexTax().$promise.then(function(data){
		$scope.saleTaxMaster = data;
	    getStates();
	})


	function getStates(){
		for(var x in $scope.saleTaxMaster){
			if($scope.saleTaxMaster.hasOwnProperty(x)){
			 	if(x !="$promise" && x !="$resolved")
			 		$scope.states.push(x);			 	
			}	
		}
	}


	$scope.$watchCollection('[sameShippingBillingAddress,shippingAddress.line1,shippingAddress.line2,shippingAddress.city,shippingAddress.state,shippingAddress.zip]',function(newValue,oldValue,scope){
		//console.log("Shipping "+$scope.shippingAddress);
		if($scope.sameShippingBillingAddress){
			oldShippingAddress=JSON.parse(JSON.stringify($scope.billingAddress));
			$scope.billingAddress=JSON.parse(JSON.stringify($scope.shippingAddress));
		}	
		else{
			$scope.billingAddress=JSON.parse(JSON.stringify(oldShippingAddress));			
			/*
			$scope.billingAddress.line1="";
			$scope.billingAddress.line2="";
			$scope.billingAddress.city="";
			$scope.billingAddress.state="";
			$scope.billingAddress.zip="";
			*/
		}
		console.log(oldValue);	
		console.log(newValue + " new");
		//console.log($scope.$id);

		//console.log("Billing "+$scope.billingAddress);
	});

	$scope.$watch('shippingAddress.state',function(){

		//console.log($scope.shippingAddress.state);
		var stateTax=getTax();
		$scope.tax=$scope.currentTotal*(stateTax/100);
		$scope.totalAmount=$scope.currentTotal+$scope.tax;
	})	

	function getTax(){
		var currState=$scope.shippingAddress.state.trim();
		//console.log(currState+" Is current State")
		var taxPercent=0;

		for(var x in $scope.saleTaxMaster){
			if($scope.saleTaxMaster.hasOwnProperty(x)){
				if(currState==x){
					//console.log(x+" has value of  "+$scope.saleTaxMaster[x]);	
					taxPercent=$scope.saleTaxMaster[x];
					break;
				}
			}	
		}

		return taxPercent;
	}

	$scope.makePayment=function(){
		Payment.setPaymentDetail($scope.shippingAddress,$scope.billingAddress,$scope.totalAmount);
		window.location.href = "#/payment";
	}

	

})
