const express = require("express");
const app = express();
const pool = require("../lib/db");


//create
app.post("/api/empresa", async function (req, res) {
  const { name, email, password } = req.body;

  try {
    await pool.query('INSERT INTO empresa (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    res.status(303)
      .header("location", "/login")
      .send("Cadastrado!");
  } catch (error) {
    res.status(500)
      .send("Erro!");
    console.error(error);
  }

})

app.get("/cadastroAluno", (req, res) => {
    res.render("cadastroAluno");
  });


//read

//update

//delete
  
module.exports = app;