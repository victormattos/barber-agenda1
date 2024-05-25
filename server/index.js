require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const server = express();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

server.use(express.json());
server.use(cors({
    origin: 'https://igor-dias-barber-agendamentos.vercel.app' // Substitua com o domínio do seu front-end no Vercel
}));

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

server.listen(process.env.PORT || 8080, () => {
    console.log('Running on port ' + (process.env.PORT || 8080));
});
