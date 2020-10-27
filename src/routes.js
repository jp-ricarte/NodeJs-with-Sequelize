const express = require("express");

const userController = require("./app/controllers/UserController");

const routes = express.Router();

routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.post("/users", userController.store);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.destroy);

module.exports = routes;
