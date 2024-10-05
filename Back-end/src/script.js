

function continuarNavegando() {
    document.getElementById('modal').style.display = 'none';
}

function redirecionarParaPagina(url) {
    window.location.href = url;
}
document.getElementById('adicionarProduto1').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement1', 'true1');
});
document.getElementById('adicionar1').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// function adicionarProduto1(){
//     document.getElementById('modal').style.display = 'block';
//     localStorage.setItem('showElement1', 'true1');
// }
function adicionarProduto2(){
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement2', 'true2');
}
function openPageCart(){
    window.location.href = 'cart.html'
}
function adicionarProduto3(){
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement3', 'true3');
}
function adicionarProduto4(){
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement4', 'true4');
}
function adicionarProduto5(){
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement5', 'true5');
}
function adicionarProduto6(){
    document.getElementById('modal').style.display = 'block';
    localStorage.setItem('showElement6', 'true6');
}

function BuyNow1(){
    localStorage.setItem('showElement1', 'true1');
    openPageCart();
}
function BuyNow2(){
    localStorage.setItem('showElement2', 'true2');
    openPageCart();
}
function BuyNow3(){
    localStorage.setItem('showElement3', 'true3');
    openPageCart();
}
function BuyNow4(){
    localStorage.setItem('showElement4', 'true4');
    openPageCart();
}
function BuyNow5(){
    localStorage.setItem('showElement5', 'true5');
    openPageCart();}
function BuyNow6(){
    localStorage.setItem('showElement6', 'true6');
    openPageCart();}






    ///////////////////////////////
/*

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulação de verificação no banco de dados (Read)
    if(authenticateUser(username, password)) {
        alert("Login bem-sucedido!");
        // Redirecionar para a página principal
        window.location.href = "dashboard.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
});

function authenticateUser(username, password) {
    // Aqui você faria uma solicitação ao backend para verificar as credenciais no banco de dados
    // Exemplo fictício de verificação
    const storedUser = "usuarioExemplo";
    const storedPassword = "senhaExemplo";

    return username === storedUser && password === storedPassword;
}
*/
