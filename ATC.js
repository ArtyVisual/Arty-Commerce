
function add_to_cart(id, name, price, image) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productExists = products.some(product => product.id === id);

    if (productExists) {
        showToast1()
    } else {
        products.push({ id, name, price, image });
        localStorage.setItem('products', JSON.stringify(products));
        showToast();
    }
    
}

function showToast() {
    Toastify({
        text: "Added To Cart",
        duration: 1500, // Duration in milliseconds
        close: true, // Show close button
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "#058b0e", // Background color
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast()
}

function showToast1() {
    Toastify({
        text: "Product Already Exist in Cart",
        duration: 1500, // Duration in milliseconds
        close: true, // Show close button
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "#5f0800", // Background color
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast()
}