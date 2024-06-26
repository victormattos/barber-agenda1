require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const server = express();

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'mysql-production-4854.up.railway.app',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '<sua_senha>',
    database: process.env.DB_NAME || 'cadastro_barbearia',
    port: process.env.DB_PORT || 3306,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0
});

server.use(express.json());
server.use(cors({
    origin: 'https://igor-dias-barber-agendamentos.vercel.app' // Atualize com sua URL do Vercel
}));

// Endpoint de teste de conexão com o banco de dados
server.get('/api/test-db', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            res.status(500).send('Erro ao conectar ao banco de dados.');
        } else {
            res.send('Conexão ao banco de dados bem-sucedida!');
        }
    });
});

// Endpoint de teste
server.get('/api/test', (req, res) => {
    res.send('API funcionando!');
});

server.post('/api/register', (req, res) => {
    const { nome, email, fone, data, hora } = req.body;

    let sql = 'INSERT INTO cliente (nome, email, fone, data, hora) VALUES (?,?,?,?,?)';
    db.query(sql, [nome, email, fone, data, hora], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao registrar cliente.');
        } else {
            console.log(result);
            res.status(201).send('Cliente registrado com sucesso.');
        }
    });
});

server.get('/api/cliente', (req, res) => {
    let sql = 'SELECT * FROM cliente';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar clientes.');
        } else {
            res.send(result);
        }
    });
});

server.put('/api/edit', (req, res) => {
    const { id, nome, email, fone, data, hora } = req.body;

    let sql = 'UPDATE cliente SET nome = ?, email = ?, fone = ?, data = ?, hora = ? WHERE id = ?';
    db.query(sql, [nome, email, fone, data, hora, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao editar cliente.');
        } else {
            res.send('Cliente editado com sucesso.');
        }
    });
});

server.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;

    let sql = 'DELETE FROM cliente WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao deletar cliente.');
        } else {
            res.send('Cliente deletado com sucesso.');
        }
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Running on port ${port}`);
});
