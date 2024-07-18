function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


function CashfreePaymentResolver(sessionId,orderId)
{
  Cashfree(sessionId,orderId);
}
async function Cashfree(sessionId,orderId) {

  const res = await loadScript('https://sdk.cashfree.com/js/v3/cashfree.js');
  if (!res) {
    alert("Cashfree SDK failed to load. Are you online?");
    return;
  }
  const  handleCheckout = (sessionId) => {
    const cashfree = window.Cashfree({ mode: "production" });
    cashfree.checkout({
      paymentSessionId: `${sessionId}`,
      returnUrl: "http://localhost:5173",
      redirectTarget: "_modal"
    }).then((result) => {
        if(result.error){

            console.log("User has closed the popup, Check for Payment Status");
            console.log(result.error);
        }
        if(result.redirect){
            console.log("Payment will be redirected");
        }
        if(result.paymentDetails){
            console.log(result.paymentDetails);
           // console.log(orderId);
           // async function CheckStatus(){
           //   const respone = await PaymentCheck(orderId);
           // }
           // CheckStatus();  

        }
    });
  };
  handleCheckout(sessionId);
}

export default CashfreePaymentResolver;
