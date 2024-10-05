document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verifique se todos os elementos estão sendo referenciados corretamente
    const product_name = document.getElementById('product_name');
    const price = document.getElementById('price');
    const amount = document.getElementById('amount');
    const image_link = document.getElementById('image-link');
    const description = document.getElementById('description');

    // Se qualquer um dos elementos for nulo, logue um erro no console
    if (!product_name || !price || !amount || !image_link || !description) {
        console.error("Erro: Elemento(s) do formulário não encontrado(s).");
        return;
    }

    // Pegue os valores dos campos do formulário
    const newProduct = {
        product_name: product_name.value,
        price: price.value,
        amount: amount.value,
        image_link: image_link.value,
        description: description.value
    };

    try {
        const response = await fetch('http://localhost:3333/produtos/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        const result = await response.json();

        if (result.success) {
            alert('Produto adicionado com sucesso!');
        } else {
            alert('Erro ao adicionar produto: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
});
