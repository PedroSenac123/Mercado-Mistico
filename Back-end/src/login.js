document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { email, password };

    try {
        const res = await fetch('http://localhost:3333/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const results = await res.json();

        if (results.success) {
            // Redirecionar para a página Mercado Místico
            window.location.href = '/Front-End/html/Mercado místico.html';
        } else {
            alert('Erro ao fazer login: ' + results.message);
        }
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});
