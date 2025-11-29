document.getElementById("paynow").addEventListener("click", function () {

    // Get total amount from cart
    let totalAmount = parseFloat(document.getElementById("cart-total").innerText);

    if (!totalAmount || totalAmount <= 0) {
        alert("Your cart is empty!");
        return;
    }

    var options = {
        "key": "rzp_test_RlfVFTs1RenTks",   // <<--- PUT YOUR TEST KEY HERE
        "amount": totalAmount * 100,    // Razorpay uses paise
        "currency": "INR",
        "name": "Zanco Store",
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

    // open payment screen
    var rzp = new Razorpay(options);
    rzp.open();
});
