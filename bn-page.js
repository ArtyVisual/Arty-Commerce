document.addEventListener('DOMContentLoaded', () => {
    
    // Clear the 'buyings' data when the page is unloaded or closed
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('buyings');
    });

    let buyings = JSON.parse(localStorage.getItem('buyings')) || [];
    let cartElement = document.getElementById('cart');
    let templateProductDiv = cartElement.querySelector('.product');
    
     
    buyings.forEach((buying, index) => {
        let productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = 'flex';
        let productImage = productDiv.querySelector('.product-image');
        let productName = productDiv.querySelector('.product-name');
        let productPrice = productDiv.querySelector('.product-price');
        let productQuantity = productDiv.querySelector('.product-quantity');

        productImage.src = buying.image;
        productImage.alt = buying.name;
        productName.textContent = buying.name;
        productPrice.textContent = `₹${buying.price}`;
        productQuantity.value = buying.quantity || 1;

        productQuantity.addEventListener('keydown', (e) => {
            e.preventDefault();
        });

        // Ensure quantity cannot go below 1
        productQuantity.addEventListener('input', () => {
            if (productQuantity.value < 1) {
                productQuantity.value = 1;
            }
            buyings[index].quantity = parseInt(productQuantity.value); // Update quantity in buying array
            localStorage.setItem('buying', JSON.stringify(buyings)); // Save updated buying array
            updateTotal();
           
        });

        cartElement.appendChild(productDiv);

    });

    updateTotal(); // Calculate the initial total
});

function updateTotal() {
    let buyings = JSON.parse(localStorage.getItem('buyings')) || [];
    let cartElement = document.getElementById('cart');
    let productDivs = cartElement.querySelectorAll('.product');
    let total = 0;

    productDivs.forEach((productDiv, index) => {
        if (index > 0) { // Skip the template
            let productPrice = buyings[index - 1].price; // Subtract 1 due to template
            let productQuantity = productDiv.querySelector('.product-quantity').value;
            total += productPrice * productQuantity;
        }
    });

    total = total.toFixed(2);
    document.getElementById('total').textContent = total;
    localStorage.setItem('total', total); // Save total in localStorage
    calculateDiscount(); // Update discount whenever total changes
}



function calculateDiscount() {
    // Get the total price from the span with id "total"
    const totalElement = document.getElementById('total');
    const rfElement = document.getElementById('rf-amount');
    const finalElement = document.getElementById('f-amount');
    const discountElement = document.getElementById('discount');
    const total = parseFloat(totalElement.innerText);

    // Calculate 5% discount
    const discount = total * 0.05;

    // Update the discount span
    discountElement.innerText = discount.toFixed(2);

    // Update the final total after discount
    const newTotal = total - discount;
    const rTotal = Math.round(newTotal);
    const rfAmount = Math.abs(newTotal - rTotal);

    if(rTotal>newTotal){
        rfElement.innerText = "+ ₹ " +  rfAmount.toFixed(2);
    }
    else
    {
        rfElement.innerText = "- ₹ " +  rfAmount.toFixed(2);
    }
   
    finalElement.innerText = rTotal;

    // Save the discount and final total in localStorage
    localStorage.setItem('discount', discount.toFixed(2));
    localStorage.setItem('finalTotal', rTotal);
    localStorage.setItem('rfAmount', rfAmount.toFixed(2));
}


