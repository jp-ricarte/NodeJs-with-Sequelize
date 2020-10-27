const Sequelize = require("Sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/Users");

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;
