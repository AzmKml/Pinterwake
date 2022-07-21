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
router.get('/profile/:profileId/photo/:photoId/delete', Controller.deletePhoto)

//PHOTO
router.get("/photo/:id", Controller.photoId);
router.get('/photo/:id/like', Controller.likePhoto)

module.exports = router;
