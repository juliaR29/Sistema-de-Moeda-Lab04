const express = require("express");
const app = express();
const pool = require("../lib/db");


app.get("/cadastroEmpresa", (req, res) => {
  res.render("cadastroEmpresa");
});

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

//read
app.get("/exibeEmpresa", async function (req, res)  {
  const result = await pool.query('SELECT * FROM empresa');
  res.render("exibeEmpresa", { empresas: result.rows });
});

//update
app.get("/editarEmpresa/:id", async function (req, res) {
  const id = req.params.id;
  let result;
  if (id) {
      result = await pool.query('SELECT * FROM empresa WHERE id = $1', [id]);
  } else {
      res.status(404)
          .send("Not Found");
      return;
  }

  res.render("exibeEmpresa", { empresa: result.rows[0] });
})

app.post("/editarEmpresa/:id", checkAuth, async function (req, res) {
  const { id } = req.params;
  const { nome, empresa, descricao, requisitos, beneficio, salario } = req.body;

  try {
      await pool.query('UPDATE empresa SET nome = $1, empresa = $2, descricao = $3, requisitos = $4, beneficio = $5, salario = $6 WHERE id = $7', [nome, empresa, descricao, requisitos, beneficio, salario, id]);
      res.status(303)
          .header("location", "/exibeAluno")
          .send("Atualizado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }

})

//delete
app.delete("/deleteEmpresa/:id", async function (req, res) {
  const { id } = req.params;

  try {
      await pool.query('DELETE FROM empresa WHERE id = $1', [id]);
      res.status(303)
          .header("location", "/cadastroEmpresa")
          .send("Deletado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }

})
module.exports = app;