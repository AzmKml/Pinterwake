const { User, Profile, Category, Photo } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const since = require("../helpers/since");

class Controller {
  static login = (req, res) => {
    res.render("login");
  };

  static home(req, res) {
    const { byCategory, search } = req.query;
    const session = req.session;
    let parameter = {
      order: [["createdAt", "DESC"]],
      include: { model: Category },
    };

    if (byCategory && search) {
      parameter.where = {
        [Op.and]: [
          {
            search: { [Op.iLike]: `%${search}%` },
            byCategory: { CategoryId: byCategory },
          },
        ],
      };
    }
    if (byCategory) {
      parameter.where = { CategoryId: byCategory };
    } else if (search) {
      parameter.where = { title: { [Op.iLike]: `%${search}%` } };
    }
    let photo;
    Photo.findAll(parameter)
      .then((data) => {
        photo = data;
        return Category.findAll();
      })
      .then((category) => {
        res.render("home", { photo, category, byCategory, session });
      });
  }

  static showByCategories(req, res) {
    const { search } = req.query;
    const { id } = req.params;
    const session = req.session;
    let parameter = {
      where: { CategoryId: id },
      order: [["createdAt", "DESC"]],
      include: { model: Category },
    };
    if (search) {
      parameter.where = {
        [Op.and]: [{ title: { [Op.iLike]: `%${search}%` }, CategoryId: id }],
      };
    }
    let photo;
    Photo.findAll(parameter)
      .then((data) => {
        photo = data;
        return Category.findAll();
      })
      .then((category) => {
        res.render("homeByCategories", { photo, category, session });
      });
  }
  static loginPost = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then((user) => {
        let isPassword = bcrypt.compareSync(password, user.password);
        if (isPassword) {
          //role:false -> user | role:true -> admin | role:null -> guest
          req.session.data = { id: user.id, role: user.role };
          res.redirect("/");
        } else {
          res.send(`password salah`);
        }
      })
      .catch((error) => res.send(error));
  };

  static logout = (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        res.send(error);
      } else {
        res.redirect("/");
      }
    });
  };

  static register = (req, res) => {
    if (!req.session) {
      req.session.data = { id: null, role: null };
    }
    const session = req.session;
    res.render("registration", { session });
  };

  static registerPost = (req, res) => {
    console.log("masuk ke registerPost");
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then((data) => {
        console.log(data);
        const result = {
          name: "Foo Bar",
          dateOfBirth: data.createdAt,
          gender: "Male",
          bio: "Lorem Ipsum",
          UserId: data.id,
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        };
        return Profile.create(result);
      })
      .then(() => res.redirect("/login"))
      .catch((error) => res.send(error));
  };

  static uploadedFile(req, res) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = "./upload/" + sampleFile.name;
    const { id } = req.params;
    const { title, CategoryId } = req.body;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      Photo.create({
        title,
        imageUrl: sampleFile.name,
        UserId: id,
        CategoryId,
      })
        .then(() => res.redirect(`/profile/${id}`))
        .catch((err) => res.send(err));
    });
  }

  static profilePage(req, res) {
    const { id } = req.params;
    let category, profile, photo;
    const session = req.session;

    Category.findAll()
      .then((categories) => {
        category = categories;
        return User.findAll({
          include: {
            model: Profile,
            where: { UserId: id },
          },
        });
      })
      .then((dataProfile) => {
        profile = dataProfile[0];
        console.log(dataProfile);
        return Photo.findAll({
          include: User,
          where: { UserId: id },
        });
      })
      .then((data) => {
        photo = data;
        console.log("masuk1");
        return Photo.sumLikeView(id);
      })
      .then((likeView) => {
        res.render("profile", { category, profile, photo, likeView, session });
      })
      .catch((err) => res.send(err));
  }

  static photoId(req, res) {
    const { id } = req.params;
    const session = req.session;
    //check if already logged in or not (guest)
    if (!req.session.data) {
      req.session.data = { id: null, role: null };
    }
    let photo, isUser;
    Photo.findAll({
      include: { model: User },
      where: {
        id,
      },
    })
      .then((data) => {
        photo = data[0];
        //role:false -> user | role:true -> admin | role:null -> guest
        if (req.session.data.role === false) {
          isUser = true;
        } else if (req.session.data.role === true) {
          isUser = false;
        } else if (req.session.data.role === null) {
          isUser = null;
        }
        return Photo.increment({ view: 1 }, { where: { id } });
      })
      .then(() => res.render("photo", { photo, isUser, since, session }))
      .catch((err) => res.send(err));
  }

  static likePhoto(req, res) {
    const { id } = req.params;
    let result;

    Photo.findOne({
      where: { id },
    })
      .then((data) => {
        result = data;
        result.view = result.view - 1;
        return Photo.update({ view: result.view }, { where: { id } });
      })
      .then((data) => {
        return Photo.increment({ like: 1 }, { where: { id } });
      })
      .then(() => res.redirect(`/photo/${id}`))
      .catch((err) => res.send(err));
  }

  static deletePhoto(req, res) {
    const { profileId, photoId } = req.params;
    Photo.destroy({
      where: { id: photoId },
    })
      .then(() => res.redirect(`/profile/${profileId}`))
      .catch((err) => res.send(err));
  }

  static deletePhotoAdmin(req, res) {
    const { id } = req.params;
    Photo.destroy({
      where: { id },
    })
      .then(() => res.redirect(`/`))
      .catch((err) => res.send(err));
  }

  static cek(req, res) {
    Photo.sumLikeView(1).then((data1) => {
      console.log("masuk2");
      console.log(data1);
      res.send(data1);
    });
  }
}

module.exports = Controller;
