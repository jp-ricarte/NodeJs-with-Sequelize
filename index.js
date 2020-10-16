const express = require("express");
const server = express();

server.use(express.json());
process.PORT = 3333;

users = [];

function validation(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ error: "Nome do usuário obrigatório!" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.id];
  if (!user) {
    return res.status(400).json({ error: "User does not exists!" });
  }

  req.user = user;

  return next();
}

server.get("/users/:id", checkUserInArray, function (req, res) {
  return res.json(req.user);
});

server.get("/users", function (req, res) {
  return res.json(users);
});

server.post("/users", validation, function (req, res) {
  const { id, name } = req.body;

  const user = {
    id,
    name,
  };
  users.push(user);

  return res.json(user);
});

server.put("/users/:id", validation, checkUserInArray, function (req, res) {
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;

  return res.json(users);
});

server.delete("/users/:id", checkUserInArray, function (req, res) {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json({ message: "Usuário deletado com sucesso!" });
});

server.get("/helloworld", function (req, res) {
  res.send("Como eh que ta ai meu parcero");
});

server.listen(process.PORT, function (erro) {
  if (erro) {
    console.log("Erro");
  } else {
    console.log("Servidor rodando na porta " + process.PORT);
  }
});
