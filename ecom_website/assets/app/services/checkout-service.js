var myStoreCheckoutService=angular.module("myStoreCheckoutService",['ngResource']);



myStoreCheckoutService.factory('Checkout',function($resource){

	return $resource('assets/app/data/billing/:file.json', {}, {
      getSalexTax: {method:'GET', params:{file:'sales-tax'}, isArray:false}      
    });

}) 	