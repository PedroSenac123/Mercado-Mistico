const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

dotenv.config(); // Carregar variáveis de ambiente

const app = express();
const port = 3333;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'secretestrandomkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'Mercado'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para cadastro de usuários
app.post('/usuario/cadastrar', (req, res) => {
    const { user_name, email, password, cpf, phone, status_user } = req.body;

    const query = `INSERT INTO users (user_name, password, email, cpf, phone, status_user) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [user_name, password, email, cpf, phone, status_user], (err, results) => {
        if (err) {
            res.status(400).json({ success: false, message: 'Erro ao cadastrar usuário', data: err });
        } else {
            res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso', data: results });
        }
    });
});

// Endpoint para login de usuários
app.post('/usuario/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor', data: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuário não encontrado ou senha incorreta' });
        }

        const user = results[0];

        // Armazena o ID e o status do usuário na sessão
        req.session.userId = user.id_user;
        req.session.statusUser = user.status_user;

        console.log('Sessão atual:', req.session); // Para debug

        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            data: { userId: user.id_user, statusUser: user.status_user }
        });
    });
});

// Verificar se o usuário é administrador
app.get('/usuario/info', (req, res) => {
    if (req.session.userId) {
        res.json({ isAdmin: req.session.statusUser === 'Admin' });
    } else {
        res.status(401).json({ success: false, message: 'Não autenticado' });
    }
});

// Listar usuários
app.get('/usuario/listar', (req, res) => {
    const query = "SELECT * FROM users;";

    connection.query(query, (err, results) => {
        if (results) {
            res.status(200).json({ success: true, message: "Sucesso", data: results });
        } else {
            res.status(400).json({ success: false, message: "Sem sucesso", data: err });
        }
    });
});

// Obter todos os produtos
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM products';

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao obter produtos', error: err });
        }
        res.status(200).json({ success: true, data: results });
    });
});

// Adicionar um produto
app.post('/produtos/adicionar', (req, res) => {
    const { product_name, price, amount, image_link, description } = req.body;

    if (!product_name || !price || !amount || !image_link || !description) {
        return res.status(400).json({
            success: false,
            message: 'Todos os campos são obrigatórios'
        });
    }

    const query = 'INSERT INTO products (product_name, price, amount, image_link, description) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [product_name, price, amount, image_link, description], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Erro ao adicionar produto',
                data: err
            });
        }
        res.status(201).json({
            success: true,
            message: 'Produto adicionado com sucesso',
            data: results
        });
    });
});

app.put('/produtos/editar/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, description, price, image_link } = req.body;

    const query = `UPDATE products SET product_name = ?, description = ?, price = ?, image_link = ? WHERE id_products = ?`;

    connection.query(query, [product_name, description, price, image_link, id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao editar o produto', data: err });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }

        res.status(200).json({ success: true, message: 'Produto atualizado com sucesso' });
    });
});

app.delete('/produtos/deletar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM products WHERE id_products = ?`;

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o produto', data: err });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }

        res.status(200).json({ success: true, message: 'Produto deletado com sucesso' });
    });
});

// Obter produto por ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM products WHERE id_products = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor', data: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }

        res.status(200).json({ success: true, data: results[0] });
    });
});

// Editar um usuário
app.put('/usuario/editar/:id', (req, res) => {
    let params = [req.body.user_name, req.params.id];
    let query = "UPDATE users SET user_name = ? WHERE id_user = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            res.status(200).json({
                success: true,
                message: "Usuário editado com sucesso",
                data: results
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Erro ao editar usuário",
                data: err
            });
        }
    });
});

// Deletar um usuário
app.delete('/usuario/deletar/:id', (req, res) => {
    let params = [req.params.id];
    let query = "DELETE FROM users WHERE id_user = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            res.status(200).json({
                success: true,
                message: "Usuário deletado com sucesso",
                data: results
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Erro ao deletar usuário",
                data: err
            });
        }
    });
});

// Rota para obter os itens do carrinho de um usuário específico
app.get('/cart/:id_user', (req, res) => {
    const userId = req.params.id_user;

    const query = `
        SELECT p.id_products, p.product_name, p.price, p.amount, c.qtde 
        FROM cart c 
        INNER JOIN products p ON c.id_products = p.id_products 
        WHERE c.id_user = ?`;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor', error: err });
        }
        res.status(200).json({ success: true, cartItems: results });
    });
});

// Rota para adicionar item ao carrinho
app.post('/cart/adicionar', (req, res) => {
    const { id_products, qtde } = req.body;
    const id_user = req.session.userId; // Acessando o ID do usuário da sessão

    console.log('ID do usuário na sessão:', id_user); // Para verificar se o ID está correto

    if (!id_user) {
        return res.status(401).json({ success: false, message: 'Usuário não está logado.' });
    }

    const query = `INSERT INTO cart (id_user, id_products, qtde) VALUES (?, ?, ?)`;

    connection.query(query, [id_user, id_products, qtde], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar item ao carrinho:', err);
            return res.status(500).json({ success: false, message: 'Erro ao adicionar item ao carrinho', data: err });
        }
        res.status(201).json({ success: true, message: 'Item adicionado ao carrinho', data: results });
    });
});

// Rota para remover item do carrinho
app.delete('/cart/:id_user/:id_products', (req, res) => {
    const { id_user, id_products } = req.params;

    const query = `DELETE FROM cart WHERE id_user = ? AND id_products = ?`;

    connection.query(query, [id_user, id_products], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao remover item do carrinho', data: err });
        }
        res.status(200).json({ success: true, message: 'Item removido do carrinho', data: results });
    });
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
