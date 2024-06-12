function Buy_Now(id, name, price, image) {
    let buyings = JSON.parse(localStorage.getItem('buyings')) || [];
    // let productExists = buying.some(product => product.id === id);

    buyings.push({ id, name, price, image });
    localStorage.setItem('buyings', JSON.stringify(buyings));
}