const Controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();

router.use(express.static("../upload"));

//HOME
router.get("/", Controller.home);
router.get("/categories/:id", Controller.showByCategories);

//LOGIN
router.get("/login", Controller.login);
router.post("/login", Controller.loginPost);
//REGISTER
router.get("/register", Controller.register);
router.post("/register", Controller.registerPost);

//PROFILE
router.get("/profile/:id", Controller.profilePage);
router.post("/profile/:id", Controller.uploadedFile);

//PHOTO
router.get("/photo/:id", Controller.photoId);

module.exports = router;
