const { User, Profile, Category, Photo } = require("../models");
const bcrypt = require("bcryptjs");
class Controller {
  static login = (req, res) => {
    res.render("login");
  };


    static home(req, res){
        Category.findAll()
        .then(category=>{
        res.render('home', {category})
    })
    }

    static showByCategories(req, res){
        const {id} = req.params
        let categoryId;
        Category.findOne({
            where: { id }
        })
        .then(category =>{
            categoryId = category
            return Category.findAll()
        })
        .then(categories =>{
            res.render('homeByCategories', {categoryId, categories})
        })
    }
  static loginPost = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then((user) => {
        let isNewPassword = bcrypt.compareSync(password, user.password);
        if (isNewPassword) {
          res.redirect("/");
        } else {
          res.send(`password salah`);
        }
      })
      .catch((error) => res.send(error));
  };

  static register = (req, res) => {
    res.render("registration");
  };

  static registerPost = (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    User.create({ username, email, password })
      .then(() => res.redirect("/login"))
      .catch((error) => res.send(error));
  };
}

module.exports = Controller;
