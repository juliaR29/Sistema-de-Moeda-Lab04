const express = require("express");
const app = express();
const pool = require("../lib/db");


app.get("/cadastroAluno", (req, res) => {
  res.render("cadastroAluno");
});

//create
app.post("/api/aluno", async function (req, res) {
  const { nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso } = req.body;

  try {
    await pool.query('INSERT INTO aluno (nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso) VALUES ($1, $2, $3)', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso]);
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
app.get("/exibeAluno", async function (req, res)  {
  const result = await pool.query('SELECT * FROM empresa');
  res.render("exibeAluno", { alunos: result.rows });
});

//update

app.get("/editarAluno/:id", async function (req, res) {
  const id = req.params.id;
  let result;
  if (id) {
      result = await pool.query('SELECT * FROM aluno WHERE id = $1', [id]);
  } else {
      res.status(404)
          .send("Not Found");
      return;
  }

  res.render("exibeAluno", { aluno: result.rows[0] });
})

app.post("/editarAluno/:id", checkAuth, async function (req, res) {
  const { id } = req.params;
  const { nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso } = req.body;

  try {
      await pool.query('UPDATE aluno SET nome = $1, email = $2, cpf = $3, rua = $4, complemento = $5, bairro = $6, instituicao = $7, curso = $8 WHERE id = $7', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso, id]);
      res.status(303)
          .header("location", "/exibeAluno")
          .send("Atualizado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }

})
//delete
app.delete("/deleteAluno/:id", async function (req, res) {
  const { id } = req.params;

  try {
      await pool.query('DELETE FROM aluno WHERE id = $1', [id]);
      res.status(303)
          .header("location", "/cadastroAluno")
          .send("Deletado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }

})
  
module.exports = app;