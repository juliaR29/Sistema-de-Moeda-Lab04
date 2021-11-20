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
    const resultado = await pool.query('INSERT INTO aluno (nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso]);
    const id = resultado.rows[0].id;
    res.status(303)
      .header("location", `/exibeAluno/${id}`)
      .send("Cadastrado!");
  } catch (error) {
    res.status(500)
      .send("Erro!");
    console.error(error);
  }

})

//read
app.get("/exibeAluno/:id", async function (req, res)  {
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM aluno WHERE id = $1', [id]);
  res.render("exibeAluno", { aluno: result.rows[0]});
});

//update


app.post("/api/aluno/:id", async function (req, res) {
  const { id } = req.params;
  const { nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso } = req.body;

  try {
      await pool.query('UPDATE aluno SET nome = $1, email = $2, cpf = $3, rg = $4, rua = $5, complemento = $6, bairro = $7, instituicao = $8, curso = $9 WHERE id = $10', [nome, email, cpf, rg, rua, complemento, bairro, instituicao, curso, id]);
      res.status(303)
          .header("location", `/exibeAluno/${id}`)
          .send("Atualizado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }

})
//delete
app.delete("/api/aluno/:id", async function (req, res) {
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