var myStoreUserService=angular.module("myStoreUserService",[]);

myStoreUserService.factory('User',function(){


  var Users=[
	{	"username": "anuj",
		"password" : "anuj"
 	},
 	{	"username": "donvir",
		"password" : "DON"
 	}
 ];


  var loggedIn = false; // this is private

  return {
    login: function() {
      loggedIn = true;
    },
    logout: function() {
      loggedIn = false;
    },
    isAuthenticated: function() {
      return loggedIn;
    },
    getUserPassword:function(userName,password){
     var userStatus=[false,"Please Enter Correct User Name"];

  	 for (var key in Users)
 	   {
     	if (Users.hasOwnProperty(key))
     	 {   
        
       	  if(Users[key].username==userName) {
       	  	
       	    if(password == Users[key].password){
       	    	userStatus[0]=true;
       	    	userStatus[1]="Welcome "+userName;
       	    	//alert("Setting Status to "+userStatus[0]+" and "+userStatus[1]);
       	    }
       	    else{
       	    	userStatus[0]=false;
       	    	userStatus[1]="Please Enter Correct Password";
       	    } 
       	    break; 	       
     	              		
  	 	  };

     	 };

 	   }
  	  return userStatus;
    }
  };


});
