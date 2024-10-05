// /Front-End/js/cadastrar.js
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const user_name = document.getElementById('user_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const status_user = document.querySelector('input[name="status_user"]:checked').value;

    const data = { user_name, email, password, cpf, phone, status_user };

    try {
        const response = await fetch('http://localhost:3333/usuario/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('userForm').reset();
        } else {
            alert('Erro ao cadastrar usuário: ' + result.message);
        }
    } catch (error) {
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
});
