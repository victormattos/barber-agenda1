require('dotenv').config();
const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { nome, email, fone, data, hora } = req.body;

    let sql = "INSERT INTO cliente (nome, email, fone, data, hora) VALUES (?,?,?,?,?)";
    db.query(sql, [nome, email, fone, data, hora], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting data");
        } else {
            res.send(result);
        }
    });
});

server.get("/cliente", (req, res) => {
    let sql = "SELECT * FROM cliente";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data");
        } else {
            res.send(result);
        }
    });
});

server.put("/edit", (req, res) => {
    const { id, nome, email, fone, data, hora } = req.body;

    let sql = "UPDATE cliente SET nome = ?, email = ?, fone = ?, data = ?, hora = ? WHERE id = ?";
    db.query(sql, [nome, email, fone, data, hora, id], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
        } else {
            res.send(result);
        }
    });
});

server.delete("/delete/:index", (req, res) => {
    const { index } = req.params;

    let sql = "DELETE FROM cliente WHERE id = ?";
    db.query(sql, [index], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting data");
        } else {
            res.send(result);
        }
    });
});

server.get('/api/test', (req, res) => {
  res.send('API funcionando!');
});

server.listen(3001, () => console.log("Running in the port 3001"));

    const { index } = req.params;
    let sql = "DELETE FROM cliente WHERE id = ?";
    db.query(sql, [index], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => console.log(`Running in the port ${port}`));
