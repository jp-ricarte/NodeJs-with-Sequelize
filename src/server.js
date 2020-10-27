const express = require("express");
const server = express();
const routes = require("./routes");

require("dotenv/config");
require("./database");

server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);
