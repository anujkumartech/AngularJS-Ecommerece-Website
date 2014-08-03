var myStoreServiceController=angular.module("myStoreServiceController",['ngResource']);

myStoreServiceController.factory('Product',function($resource){

 return $resource('assets/app/data/product/:file.json', {}, {
      query: {method:'GET', params:{file:'products'}, isArray:true},
      getProduct:{method:'GET', params:{file:'@file'}, isArray:false}
    });

});
