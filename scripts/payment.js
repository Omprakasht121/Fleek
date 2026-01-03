document.getElementById("paynow").addEventListener("click", function () {


    let totalAmount = parseFloat(document.getElementById("cart-total").innerText);

    if (!totalAmount || totalAmount <= 0) {
        alert("Your cart is empty!");
        return;
    }
    var options = {
        "key": window.CONFIG.RAZORPAY_KEY,  
        "amount": totalAmount * 100,   
        "currency": "INR",
        "name": "Fleek Store",
        "description": "Test Payment",
        "image": "https://your-logo-url.com/logo.png",

        "handler": function (response) {
            alert("Payment Successful!");
            console.log("Payment ID:", response.razorpay_payment_id);
        },

        "theme": {
            "color": "#3399cc"
        }
    };

    
    var rzp = new Razorpay(options);
    rzp.open();
});
