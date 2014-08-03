var myStoreCartService=angular.module("myStoreCartService",[]);

myStoreCartService.factory('Cart',function(){

	var userCart=[];
	var cartSummary=[];

  //var cartTestData=[{"productname":"Keshaa","price":"50"},{"productname":"Keshaa","price":"50"},{"productname":"Ketty Perry ","price":"60"},{"productname":"Ariana Grande","price":"30"},{"productname":"Ellie Goulding","price":"40"},{"productname":"Iggy Azalea","price":"20"}];
  var cartConsolidatedData=[];
  var currentTotalMaster;

  function formCart(){
    cartConsolidatedData=[];
    var dup=false;
    var temp;

    for(x in userCart){
      dup=false;  
      for(z in cartConsolidatedData){
          if(cartConsolidatedData[z].productname==userCart[x].productname){
            cartConsolidatedData[z].quantity=cartConsolidatedData[z].quantity+1;
            dup=true;
            break;
          }
      }     
      if(!dup){
        var temp1=JSON.parse(JSON.stringify(userCart[x]));
        temp1.quantity=1
        cartConsolidatedData.push(temp1);
      } 
    }        
  };

  function updateCartHelper(changeValue,productName,addRemoveLocal){
    for(x in userCart){
      if(userCart[x].productname==productName){
        if(addRemoveLocal){
          var localTemp=JSON.parse(JSON.stringify(userCart[x]));
          for(var i=0;i<changeValue;i++){
            userCart.push(localTemp);
           }
          break;  
        }
        else{
          for(var i=0;i<changeValue;i++){
            for(z in userCart){
              if(userCart[z].productname==productName){
                var indexOfItem=userCart.indexOf(userCart[z]);
                //console.log("Removed called product " + userCart[z].productname +" which has index of "+indexOfItem + " z has value of "+z);
                userCart.splice(indexOfItem,1);
                //z--;
                break;
              }
            }   
          }
          break;
        }  
      }   
    }    
  };
         function getCurrentTotalLocal() {
          
          var currentSum=0;
          for (var key in cartConsolidatedData)
          {  
            if (cartConsolidatedData.hasOwnProperty(key))
            {    
              // get sum     
              currentSum = currentSum+((parseInt(cartConsolidatedData[key].price))*(parseInt(cartConsolidatedData[key].quantity)));
              
              continue;
            };
          }
          currentTotalMaster=currentSum;
          return currentSum;
        }


	return{
		    addItemToCart: function(cartData) {
          var temp=JSON.parse(JSON.stringify(cartData));
          userCart.push(temp); 
          formCart(); 
      	},	

      	retiveCart: function(){
      		return userCart;
      	},

      	getCartSummary: function(){
      		cartSummary=[];
      		for (var key in userCart){
      			var currentItem={"productname":"","price":""};				
   				  if(userCart.hasOwnProperty(key)){  					
     					currentItem["productname"]=userCart[key].productname;
     					currentItem["price"]=userCart[key].price;
     					cartSummary.push(currentItem);
     					continue;
   				  };
			    }
			    return cartSummary;
      	},

      	getCurrentTotal: function(){
      		
      		var currentSum=getCurrentTotalLocal();
          //How we could localize methods
				  /*for (var key in cartConsolidatedData)
				  {  
   					if (cartConsolidatedData.hasOwnProperty(key))
  					{    
  						// get sum     
     					currentSum = currentSum+((parseInt(cartConsolidatedData[key].price))*(parseInt(cartConsolidatedData[key].quantity)));
     					
     					continue;
   					};
				  }
          currentTotalMaster=currentSum;*/
			    return currentSum;
      	},

        getTestData: function(){
            return cartTestData;
        },

        removeCartItem:function(item,itemQty){
          for(var i=0;i<itemQty;i++){
            for(x in userCart){
              if(userCart[x].productname==item){
                var indexOfItem=userCart.indexOf(userCart[x]);
                userCart.splice(indexOfItem, 1);
                }
            }
          }   
          formCart();
          getCurrentTotalLocal();
          return cartConsolidatedData;
        },

        getJustCartSummary:function(){
          return cartSummary;
        },

        getCartConsilidatedData:function(){
          formCart();
          return cartConsolidatedData;          

        },

        updateCart:function(){
          var diff=0;
          var addRemove;
          for(x in cartConsolidatedData){
            if(cartConsolidatedData[x].quantity==0){
              alert("Please click Remove button to completly remove item " +cartConsolidatedData[x].productname);
              cartConsolidatedData[x].quantity=1;
              break;
            }
            diff=0;
            var count=0;
            for(y in userCart){
              if(cartConsolidatedData[x].productname==userCart[y].productname){
                count++;
              }          
            }
            diff=cartConsolidatedData[x].quantity-count;
            if(diff >0)
              addRemove=true;
            else
              addRemove=false; 
            var absoluteDiff=Math.abs(diff);
            if(absoluteDiff!=0){
              updateCartHelper(absoluteDiff,cartConsolidatedData[x].productname,addRemove); 
            }

          }     
          /*formCart();  Not needed. As data in consolidated cart automatically updated via reference : view-->$scope.cartTotalItems--->cartConsolidatedData.
                         This is classic case of JSON(JavaScript) objects are made references(pointers) when used = operator */ 
          return cartConsolidatedData;
          
        },

        getTotalNumberOfItem:function(){
          var totalItem=userCart.length;
          return totalItem;
        }


	}

});
