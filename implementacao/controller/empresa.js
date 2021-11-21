const express = require("express");
const app = express();
const pool = require("../lib/db");
const { Empresa } = require("../model/empresa");


app.get("/cadastroEmpresa", (req, res) => {
  res.render("cadastroEmpresa");
});

//create
app.post("/api/empresa", async function (req, res) {
  try {
    const empresa = await Empresa.create(req.body);
    const id = empresa.id;
    res.status(303)
      .header("location", `/exibeEmpresa/${id}`)
      .send("Cadastrado!");
  } catch (error) {
    res.status(500)
      .send("Erro!");
    console.error(error);
  }
})

//read
app.get("/exibeEmpresa/:id", async function (req, res)  {
  const empresa = await Empresa.get(req.params.id)
  if (!empresa) {
    res.status(404)
      .send("Não encontrado!");
    return;
  }
  res.render("exibeEmpresa", { empresa });
});

//update
app.post("/api/empresa/:id", async function (req, res) {
  try {
      await Empresa.update(req.params.id, req.body);
      res.status(303)
          .header("location", `/exibeEmpresa/${req.params.id}`)
          .send("Atualizado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }
})

//delete
app.delete("/api/empresa/:id", async function (req, res) {
  const { id } = req.params;
  try {
      await Empresa.delete(id);
      res.status(303)
          .header("location", "/cadastroEmpresa")
          .send("Deletado!");
  } catch (erro) {
      res.status(500)
          .send(erro.message);
  }
})

module.exports = app;