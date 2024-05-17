const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.use(express.json());
app.use(cors());

// Rotas
app.post("/register", (req, res) => {
    const { nome, email, fone, data, hora } = req.body;
    let sql = "INSERT INTO cliente (nome, email, fone, data, hora) VALUES (?,?,?,?,?)";
    db.query(sql, [nome, email, fone, data, hora], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/cliente", (req, res) => {
    let sql = "SELECT * FROM cliente";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { id, nome, email, fone, data, hora } = req.body;
    console.log("Server received edit request with the following data:", req.body);
    let sql = "UPDATE cliente SET nome = ?, email = ?, fone = ?, data = ?, hora = ? WHERE id = ?";
    db.query(sql, [nome, email, fone, data, hora, id], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
        } else {
            console.log("Data updated successfully:", result);
            res.send(result);
        }
    });
});

app.delete("/delete/:index", (req, res) => {
    const { index } = req.params;
    let sql = "DELETE FROM cliente WHERE id = ?";
    db.query(sql, [index], (err, result) => {
        err ? console.log(err) : res.send(result);
    });
});

app.listen(port, () => console.log(`Running in the port ${port}`));
