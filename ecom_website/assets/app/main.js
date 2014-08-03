
// Create an application module for our demo.
var app = angular.module( "myStore", [
						 'ngRoute',
						 'ui.bootstrap',						 
						 'myStoreController',
						 'myStoreLoginController',
						 'myStoreHomeController',
						 'myStoreServiceController'	,
						 'myStoreUserService',
						 'demoControllerModule',
						 'myStoreCartService',
						 'myStoreCartControllers',
						 'myStoreCheckoutService',
						 'myStoreCheckoutControllers'
]);

// Configure the routing. The $routeProvider will be automatically injected into 
// the configurator.
app.config(['$routeProvider',
	function( $routeProvider ){

		// Typically, when defining routes, you will map the route to a Template to be 
		// rendered; however, this only makes sense for simple web sites. When you are 
		// building more complex applications, with nested navigation, you probably need 
		// something more complex. In this case, we are mapping routes to render "Actions" 
		// rather than a template.
		 $routeProvider.
		 
	  when('/home', {
        templateUrl: 'assets/app/views/home.html',
        controller: 'myStoreHomeCtrl'
      }).
	  
      when('/viewproduct', {
        templateUrl: 'assets/app/views/products.html',
        controller: 'myStoreProductCtrl'
      }).
	  
	  when('/login', {
        templateUrl: 'assets/app/views/login.html',
        controller: 'myStoreLoginCtrl'
      }).
	  
	  when('/cart', {
        templateUrl: 'assets/app/views/cart.html',
        controller: 'myStoreCartCtrl'
      }).
	  
	  when('/checkout', {
        templateUrl: 'assets/app/views/checkout.html',
        controller: 'myStoreCheckoutCtrl'
      }).


      otherwise({
        redirectTo: '/home'
      });

	
}]);
