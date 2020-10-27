const { update, destroy } = require("../models/Users");
const User = require("../models/Users");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });

      if (users.length === 0) {
        return res.status(404).json({ message: "não há usuários cadastrados" });
      }

      return res.json(users);
    } catch (err) {
      return res.json({ message: err.message });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "name", "email"],
      });

      if (!user) {
        return res.json({ message: "Usuário não existe" });
      }

      return res.json(user);
    } catch (err) {}
  },

  async store(req, res) {
    try {
      const { name, email, password } = await User.create(req.body);

      return res.json({ name, email, password });
    } catch (err) {
      return res.json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não existe" });
      }

      const { id, name, email, password } = await user.update(req.body);

      return res.json({ id, name, email });
    } catch (err) {
      return res.json({ message: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({ message: "Usuário não existe" });
      }

      await user.destroy();

      return res.json({ message: "Usuário excluído com sucesso!" });
    } catch (err) {
      return res.json({ message: err.message });
    }
  },
};
