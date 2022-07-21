const { User, Profile, Category, Photo } = require("../models");

class Controller {
  static login = (req, res) => {
    res.render("login");
  };

  static register = (req, res) => {
    res.render("registration");
  };

  static registerPost = (req, res) => {
    const { username, email, password } = req.body;
    User.create({ username, email, password, role: false })
      .then(() => res.redirect("/login"))
      .catch((error) => res.send(error));
  };
}

module.exports = Controller;
