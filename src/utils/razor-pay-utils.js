import logo from "../assets/icons/logo_hestia_black_with_text.png";



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
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

function gatewayResolver(response) {
  if (response.razor) {
    console.log(response);
    displayRazorpay(
      response.amount,
      response.id,
      response.currency,
      response.client_name,
      response.email,
      response.phone,
      response.KEY,
    )
  } else {
    window.location.href = response.url;
  }
}



async function displayRazorpay(
  amount,
  order_id,
  currency,
  username,
  email,
  contact,
  key
) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const options = {
    key: key, // Enter the Key ID generated from the DashboardPage
    amount: amount.toString(),
    currency: currency,
    name: "Hestia 24",
    description: "National tech conducted by tkmce kollam",
    // TODO:
    image: logo,
    order_id: order_id,
    handler: async function (response) {
      // console.log(response)
      // const data = {
      //   orderCreationId: order_id,
      //   razorpayPaymentId: response.razorpay_payment_id,
      //   razorpayOrderId: response.razorpay_order_id,
      //   razorpaySignature: response.razorpay_signature,
      // };
      response.razorpay_payment_id
        ? window.location = 'https://www.hestiatkmce.live/payment/?success=true&session_id=' + response.razorpay_payment_id
        : window.location = 'https://www.hestiatkmce.live/payment/?canceled=true&session_id=' + response.razorpay_payment_id;

    },
    prefill: {
      name: username,
      email: email,
      contact: contact,
    },
    notes: {
      address: "None",
    },
    theme: {
      color: "#1b1b1b",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}


export default gatewayResolver;
