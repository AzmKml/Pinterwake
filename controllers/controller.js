const { User, Profile, Category, Photo } = require("../models");


const bcrypt = require("bcryptjs");
class Controller {
  static login = (req, res) => {
    res.render("login");
  };

   
    static home(req, res){
        const {byCategory} = req.query
        // let category;
        // let queryPhoto;
        // if(byCategory){
        //     queryPhoto = Photo.findAll({
        //         where: {
        //             CategoryId: byCategory
        //         }
        //     })
        // }else{
        //     queryPhoto = Photo.findAll()
        // }
        // Category.findAll()
        // .then(categories=>{
        //     category = categories
        //     return queryPhoto
        // })
        // .then(photo=>{
        //     res.render('home', {category,  photo})
        // })
        let parameter = {
            order: [['createdAt', 'DESC']],
            include: {model: Category}}
        if(byCategory){
            parameter.where = {CategoryId: byCategory} 
        }
        let photo
        Photo.findAll(parameter)
        .then(data=>{
            photo =  data
            return Category.findAll()
        })
        .then(category=>{
            res.render('home', {photo, category})
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

  static uploadedFile(req, res){
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = './upload/' + sampleFile.name;
    console.log('====', uploadPath);
    const {id} = req.params
    const {title, CategoryId} = req.body
    console.log(id, req.body);
 

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
        Photo.create({
            title, imageUrl: sampleFile.name, UserId: id, CategoryId
        })
        .then(()=>res.redirect(`/profile/${id}`))
        .catch(err=>res.send(err))
    });
  }

  static profilePage(req, res){
    const {id} = req.params
    let category
    Category.findAll()
    .then(categories=>{
        category = categories
        return User.findAll({
            include: {all: true,
            where: {UserId: id}},
        })
    })
    .then(photo=>{
        photo = photo[0]
        res.render('profile', {category, photo})
    })
    .catch(err=>res.send(err))
  }

  static photoId(req, res){
    const {id} = req.params
    Photo.findAll({
        include: {model: User},
        where: {
            id
        }
    })
    .then(photo=> {
        photo = photo[0] 
        res.render('photo', {photo}
    )})
    .catch(err=>res.send(err))
  } 

}

module.exports = Controller;
