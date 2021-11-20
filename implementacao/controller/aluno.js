const express = require("express");
const app = express();
const pool = require("../lib/db");
const { Aluno } = require("../model/aluno");

app.get("/cadastroAluno", (req, res) => {
  res.render("cadastroAluno");
});

//create
app.post("/api/aluno", async function (req, res) {

  try {
    const aluno = await Aluno.create(req.body);
    const id = aluno.id;
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
app.get("/exibeAluno/:id", async function (req, res) {
const aluno = await Aluno.get(req.params.id);
  if (!aluno) {
    res.status(404)
      .send("Não encontrado!");
    return;
  }
  res.render("exibeAluno", { aluno });
});

//update
app.post("/api/aluno/:id", async function (req, res) {
  

  try {
    await Aluno.update(req.params.id, req.body);
    res.status(303)
      .header("location", `/exibeAluno/${req.params.id}`)
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
    await Aluno.delete(id);
    res.status(303)
      .header("location", "/cadastroAluno")
      .send("Deletado!");
  } catch (erro) {
    res.status(500)
      .send(erro.message);
  }

})

module.exports = app;