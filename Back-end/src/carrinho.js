function clearCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    updateTotalAmount();
}

function checkout() {
    alert('Compra finalizada! Total: R$ ' + document.getElementById('totalAmount').innerText);
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    updateTotalAmount();
}

function compra(){
    alert("Compra finalizada!")
}
document.getElementById

function updateTotalAmount() {
    const cartItems = document.querySelectorAll('.grid-container > div');
    let total = 0;

    cartItems.forEach(item => {
        if (item.style.visibility === 'visible') {
            const priceElement = item.querySelector('.productPrice');
            const quantityElement = item.querySelector('.product-qtde-input');

            if (priceElement && quantityElement) {
                const price = parseFloat(priceElement.textContent).toLocaleString({style: "currency", currency: "BRL"});
                const quantity = parseInt(quantityElement.value);
                total += price * quantity;
            }
        }
    });

    document.getElementById('totalAmount').innerText = total.toFixed(2).replace('.', ',');
}


document.querySelectorAll('.product-qtde-input').forEach(input => {
    input.addEventListener('change', updateTotalAmount);
});

