require("dotenv").config();
const cadastro = require("./routes/cadastro");
const login = require("./routes/login");

const {usuarioLogado} = require("./lib/security");

const express = require("express");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const app = express();
const methodOverride = require('method-override');

app.use(express.static("./views"));
app.use("/public", express.static("./public"));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(usuarioLogado);
app.use(methodOverride('_method'));
app.use(cadastro);
app.use(login);
app.set("view engine", "ejs");

app.listen(process.env.PORT || 5000);

app.get("/", (req, res) => {
  res.render("index");
});
