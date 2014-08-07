var myStoreCartControllers=angular.module("myStoreCartControllers",['ui.bootstrap',
                                                           			'myStoreModalController',
                                                            		'myStoreModalItemController'
                                                            		]);



myStoreCartControllers.controller('myStoreCartCtrl',function($scope,$modal,$log,Product,User,Cart){

	$scope.cartTotalItems=Cart.getCartConsilidatedData();
	$scope.currentTotal=Cart.getCurrentTotal();
	$scope.cartTotalItemCount=Cart.getTotalNumberOfItem();

	$scope.removeItem=function(item){
		$scope.cartTotalItems=Cart.removeCartItem(item.productname,item.quantity);
		updateSummaryHelper();
	};

	$scope.updateCurrentCart=function(){
		$scope.cartTotalItems=Cart.updateCart();
		updateSummaryHelper();

	};

	function updateSummaryHelper(){
		$scope.currentTotal=Cart.getCurrentTotal();
		$scope.cartTotalItemCount=Cart.getTotalNumberOfItem()
	};



});