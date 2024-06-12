document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.getElementsByClassName("addtocart");

    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function(event) {
            var product = event.target.closest(".flex"); // Adjusted to the closest element containing product details
            var title = product.getElementsByClassName("product-title")[0].innerText;
            var price = product.getElementsByClassName("product-price")[0].innerText;
            var productImg = product.getElementsByClassName("productimg")[0].src;

            addProductToCart(title, price, productImg);
        });
    }

    function addProductToCart(title, price, productImg) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = { title, price, productImg };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    }
});
