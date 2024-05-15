const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "agendamento",
});

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { nome } = req.body;
    const { email } = req.body;
    const { fone } = req.body;
    const { data } = req.body;
    const { hora } = req.body;

    let sql = "INSERT INTO cliente (nome, email, fone, data, hora) VALUES (?,?,?,?,?)"
    db.query(sql, [nome, email, fone, data, hora], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});

server.get("/cliente", (req, res) => {

    let sql = "SELECT * FROM cliente";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { nome } = req.body;
    const { email } = req.body;
    const { fone } = req.body;
    const { data } = req.body;
    const { hora } = req.body;

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

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM cliente WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);