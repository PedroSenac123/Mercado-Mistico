document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');

    try {
        const response = await fetch('http://localhost:3333/produtos'); // Substitua pelo seu servidor, se necessário
        const result = await response.json();

        if (result.success) {
            const products = result.data;
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.dataset.productId = product.id_products; // Adiciona um ID único ao elemento

                productDiv.innerHTML = `
                    <img class="product${product.id_products}" src="${product.image_link}" alt="${product.product_name}">
                    <div class="product-name product${product.id_products}">${product.product_name}</div>
                    <p>${product.id_products}</p>
                    <div class="product-price product${product.id_products}">R$ ${product.price}</div>
                    <button class="edit-btn" data-product-id="${product.id_products}" style="margin-top:10px; ">Editar</button>
                `;

                productDiv.addEventListener('click', () => {
                    window.location.href = `product-details.html?id=${product.id_products}`; // Redireciona para a página de detalhes com o ID do produto
                });

                productList.appendChild(productDiv);
            });

            // Adiciona eventos de clique para os botões de edição
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation(); // Previne que o clique no botão de edição redirecione para os detalhes do produto
                    const productId = button.dataset.productId;
                    openEditProductModal(productId); // Função para abrir o modal de edição
                });
            });

        } else {
            productList.innerHTML = '<p>Erro ao carregar produtos.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        productList.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
});
function deletarProduto(event, productId) {
    event.preventDefault(); // Previne o envio do formulário
    console.log('Deletando produto com ID:', productId); // Adicione este log

    if (confirm('Tem certeza que deseja deletar este produto?')) {
        fetch(`http://localhost:3333/produtos/deletar/:${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('Resultado da deleção:', result);
            if (result.success) {
                alert('Produto deletado com sucesso!');
                document.getElementById("editProductModal").style.display = "none"; // Fecha o modal
                location.reload(); // Recarrega a página para atualizar a lista de produtos
            } else {
                alert('Erro ao deletar o produto: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Erro ao deletar o produto:', error);
        });
    }
}


// Função para abrir o modal de edição
function openEditProductModal(productId) {
    // Busca os detalhes do produto pelo ID
    fetch(`http://localhost:3333/produtos/${productId}`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const product = result.data;

                // Preenche os campos do formulário de edição
                document.getElementById('editProductName').value = product.product_name;
                document.getElementById('editProductPrice').value = product.price;
                document.getElementById('editProductAmount').value = product.amount;
                document.getElementById('editProductImageLink').value = product.image_link; // Campo para link da imagem
                document.getElementById('editProductDescription').value = product.description;

                // Exibe o modal
                document.getElementById('editProductModal').style.display = 'block';

                // Atualiza o produto quando o formulário for submetido
                document.getElementById('editProductForm').onsubmit = (event) => {
                    event.preventDefault();
                    submitEditForm(productId);
                };
            } else {
                alert('Erro ao carregar informações do produto.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar produto:', error);
        });
}

// Função para submeter o formulário de edição
function submitEditForm(productId) {
    const updatedProduct = {
        product_name: document.getElementById('editProductName').value,
        price: document.getElementById('editProductPrice').value,
        amount: document.getElementById('editProductAmount').value,
        image_link: document.getElementById('editProductImageLink').value,
        description: document.getElementById('editProductDescription').value
    };

    // Faz a requisição para atualizar o produto
    fetch(`http://localhost:3333/produtos/editar/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Produto atualizado com sucesso!');
            document.getElementById('editProductModal').style.display = 'none';
            location.reload(); // Atualiza a página para refletir as alterações
        } else {
            alert('Erro ao atualizar o produto.');
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar produto:', error);
    });
}

// Evento para fechar o modal
document.getElementById('closeEditModal').onclick = function() {
    document.getElementById('editProductModal').style.display = 'none';
};

// Fecha o modal se clicar fora do conteúdo
window.onclick = function(event) {
    const editProductModal = document.getElementById('editProductModal');
    if (event.target === editProductModal) {
        editProductModal.style.display = 'none';
    }
};

function formEditarProduto(){
    alert(4);
}

/*
function checkIfAdmin() {
    fetch('http://localhost:3333/usuario/info', {
        credentials: 'include' // Inclui cookies na requisição
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na requisição');
        }
    })
    .then(data => {
        if (data.isAdmin) {
            console.log('Usuário é admin. Redirecionando...');
            window.location.href = '/Front-End/html/add-product.html'; // Redireciona para a página de adicionar produto
        } else {
            console.log('Usuário não é admin.');
            window.location.href = '/'; // Redireciona para a página inicial ou de erro
        }
    })
    .catch(error => {
        console.error('Erro ao verificar se o usuário é admin:', error);
    });
}

// Verifica se o usuário é admin quando a página carrega
document.addEventListener('DOMContentLoaded', checkIfAdmin);

*/