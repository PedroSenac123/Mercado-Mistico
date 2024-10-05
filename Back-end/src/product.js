document.addEventListener('DOMContentLoaded', async () => {
    // Captura o ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('ID do produto não encontrado na URL');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3333/produtos/${productId}`);
        const result = await response.json();

        if (result.success) {
            const product = result.data;
            document.getElementById('product-name').textContent = product.product_name;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price').textContent = `Preço: R$ ${product.price}`;
            document.getElementById('product-image').src = product.image_link;
            document.getElementById('product-status').textContent = product.amount > 0 ? 'Em estoque' : 'Fora de estoque';

            // Adiciona o evento para o botão "Adicionar ao Carrinho"
            document.getElementById('add-to-cart-button').addEventListener('click', () => {
                adicionarAoCarrinho(productId);
            });
        } else {
            console.error('Erro ao carregar os detalhes do produto:', result.message);
        }
    } catch (error) {
        console.error('Erro ao buscar os detalhes do produto:', error);
    }
});

// Modal para compra
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("purchaseModal");
    const closeBtn = document.querySelector(".modal .close");
    const checkout = document.getElementById('finalizePurchase');

    // Função para abrir o modal com as informações do produto
    function openModal(productId) {
        fetch(`http://localhost:3333/produtos/${productId}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const product = result.data;
                    document.getElementById('productDescription').innerText = `1x ${product.product_name}`;
                    document.getElementById('productPrice').innerText = `R$ ${product.price}`;

                    // Exibe o modal
                    modal.style.display = "block";
                } else {
                    alert('Erro ao carregar informações do produto.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    // Evento para fechar o modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    checkout.onclick = function() {
        window.location.href = 'checkout.html';
    }

    // Fecha o modal se clicar fora do conteúdo
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // Exemplo de como abrir o modal ao clicar em "Comprar Agora"
    document.getElementById('buyNowButton').addEventListener('click', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id'); // Obtém o ID do produto da URL
        openModal(productId);
    });
});

// Função para adicionar ao carrinho
function adicionarAoCarrinho(productId) {
    console.log('Produto adicionado ao carrinho:', productId); // Para verificar se o ID está sendo passado corretamente

    const data = {
        id_products: productId,
        qtde: 1 // Ajuste conforme necessário
    };

    fetch('http://localhost:3333/cart/adicionar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result); // Para ver a resposta do servidor
        if (result.success) {
            alert('Produto adicionado ao carrinho com sucesso!');
        } else {
            alert('Erro ao adicionar o produto ao carrinho: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Função para obter o ID do usuário logado (implementação fictícia)
function getCurrentUserId() {
    // Verifica se a sessão existe e retorna o userId
    if (typeof sessionStorage !== 'undefined') {
        const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
        return sessionData && sessionData.userId ? sessionData.userId : null;
    }
    return null;
}


// Outras funções (apenas definições, não implementadas ainda)
function comprarAgora() {
    // Função para comprar agora
}

function continueShopping() {
    // Função para continuar navegando
}

function openPageCart() {
    // Função para abrir a página do carrinho
}
