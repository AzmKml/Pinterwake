const { User, Profile, Category, Photo } = require("../models");

class Controller {
  static login = (req, res) => {
    res.render("login");
  };

  static register = (req, res) => {
    res.render("login");
  };
}

module.exports = Controller;
