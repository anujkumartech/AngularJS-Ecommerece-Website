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
    console.log("update cart helper called for "+productName+"'"+addRemoveLocal);
   
    for(x in userCart){
      console.log("Found artist"+userCart[x].productname);
      if(userCart[x].productname==productName){
        console.log("Found "+productName);
        if(addRemoveLocal){
          var localTemp=JSON.parse(JSON.stringify(userCart[x]));
          for(var i=0;i<changeValue;i++){
            userCart.push(localTemp);
            console.log("Added product" +localTemp.productname);
            console.log(userCart);
           }
          break;  
        }
        else{
          console.log("Remove Called");
          var indexTemp={};
          var indexTemp=JSON.stringify(userCart[x]);
          delete indexTemp.$promise;
          delete indexTemp.$resolved;
          console.log("Parsed Value "+indexTemp);
          var indexOfItem1=userCart.indexOf(indexTemp);
          console.log("Index of Item to  be removed dummy "+indexOfItem1);
          for(var i=0;i<changeValue;i++){
            for(z in userCart){
              if(userCart[z].productname==productName){
                var indexOfItem=userCart.indexOf(userCart[z]);
                console.log("Removed called product " + userCart[z].productname +" which has index of "+indexOfItem + " z has value of "+z);
                userCart.splice(indexOfItem,1);
                z--;
                console.log("Changed Z to "+ z);
                break;
              }
            }   
          }
          break;
        }  
      }
      
    }
    
  };


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
      	},

        getTestData: function(){
            return cartTestData;
        },

        removeCartItem:function(item){
          var indexOfItem=userCart.indexOf(item);
          userCart.splice(indexOfItem, 1);
          formCart();
          return cartConsolidatedData;
        },

        getJustCartSummary:function(){
          return cartSummary;
        },

        getCartConsilidatedData:function(){
          formCart();
          return cartConsolidatedData;          

        },

        updateCart:function(cartItem){
          var diff=0;
          var addRemove;
          var temUserCartData=JSON.parse(JSON.stringify(cartConsolidatedData));
          for(x in cartConsolidatedData){
            diff=0;
            var count=0;
            for(y in userCart){
              if(cartConsolidatedData[x].productname==userCart[y].productname){
                count++;
              }          
            }
            diff=cartConsolidatedData[x].quantity-count;
            console.log(diff+ " is difference for "+cartConsolidatedData[x].productname);
            if(diff >0)
              addRemove=true;
            else
              addRemove=false; 
            var absoluteDiff=Math.abs(diff);
            if(absoluteDiff!=0){
              updateCartHelper(absoluteDiff,cartConsolidatedData[x].productname,addRemove); 
            }

          }     
          //formCart(); // Not needed as total updates automatically
          return cartConsolidatedData;
          
        },

        getTotalNumberOfItem:function(){
          var totalItem=userCart.length;
          return totalItem;
        }


	}

});
