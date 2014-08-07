var myStorePaymentService=angular.module("myStorePaymentService",[]);

myStorePaymentService.factory('Payment',function(){

  var userShippingAddress={};
  var userBillingAddress={};
  var paymentAmount=40;

  return{
    setPaymentDetail:function(shipAdd,billAdd,amnt){
      userShippingAddress=JSON.parse(JSON.stringify(shipAdd));
      userBillingAddress=JSON.parse(JSON.stringify(billAdd));
      paymentAmount=amnt;
      console.log(shipAdd);
      console.log(billAdd);
      console.log(paymentAmount);
    },

    getPaymentDetails:function(){
      return [userShippingAddress,userBillingAddress,paymentAmount]
    }

  };


});
