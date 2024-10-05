
function adicionarProduto9() {
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement9', 'true9');
}

function openPageCart() {
    window.location.href = 'cart.html';
}

function BuyNow9() {
    localStorage.setItem('showElement9', 'true9');
    openPageCart();
}
