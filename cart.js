document.addEventListener('DOMContentLoaded', () => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cartElement = document.getElementById('cart');
    let templateProductDiv = cartElement.querySelector('.product');
    let noProductsElement = document.getElementById('no-products');
    let last = document.getElementById('last');
    let last1 = document.getElementById('last1');
    let last2 = document.getElementById('last2');
    
    
    if (products.length === 0) {
        noProductsElement.style.display = 'grid';
        last.hidden=true; 
        last1.hidden=true; 
        last2.hidden=true; 

    } else {
        noProductsElement.style.display = 'none';
    } 
    products.forEach((product, index) => {
        let productDiv = templateProductDiv.cloneNode(true);
        productDiv.style.display = 'flex';
        let productImage = productDiv.querySelector('.product-image');
        let productName = productDiv.querySelector('.product-name');
        let productPrice = productDiv.querySelector('.product-price');
        let productQuantity = productDiv.querySelector('.product-quantity');
        let removeButton = productDiv.querySelector('.remove-product');

        productImage.src = product.image;
        productImage.alt = product.name;
        productName.textContent = product.name;
        productPrice.textContent = `₹${product.price}`;
        productQuantity.value = product.quantity || 1;

        productQuantity.addEventListener('keydown', (e) => {
            e.preventDefault();
        });

        // Ensure quantity cannot go below 1
        productQuantity.addEventListener('input', () => {
            if (productQuantity.value < 1) {
                productQuantity.value = 1;
            }
            products[index].quantity = parseInt(productQuantity.value); // Update quantity in products array
            localStorage.setItem('products', JSON.stringify(products)); // Save updated products array
            updateTotal();
           
        });

        removeButton.addEventListener('click', () => {
            removeProduct(index);
        });

        cartElement.appendChild(productDiv);
    });

    updateTotal(); // Calculate the initial total
});

function updateTotal() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cartElement = document.getElementById('cart');
    let productDivs = cartElement.querySelectorAll('.product');
    let total = 0;

    productDivs.forEach((productDiv, index) => {
        if (index > 0) { // Skip the template
            let productPrice = products[index - 1].price; // Subtract 1 due to template
            let productQuantity = productDiv.querySelector('.product-quantity').value;
            total += productPrice * productQuantity;
        }
    });

    total = total.toFixed(2);
    document.getElementById('total').textContent = total;
    localStorage.setItem('total', total); // Save total in localStorage
    calculateDiscount(); // Update discount whenever total changes
}

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload(); // reload the page to update the cart
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


