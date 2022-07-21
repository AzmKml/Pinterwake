const { User, Profile, Category, Photo } = require("../models");

class Controller {
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
}

module.exports = Controller;
