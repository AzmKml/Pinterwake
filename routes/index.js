const Controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();

router.use(express.static("../upload"));

//HOME
router.get("/", Controller.home);
// router.get('/search', Controller.homeByCategory)
router.get("/categories/:id", Controller.showByCategories);

//REGISTER
router.get("/register", Controller.register);
router.post("/register", Controller.registerPost);

//LOGIN
router.get("/login", Controller.login);
router.post("/login", Controller.loginPost);
router.use(function (req, res, next) {
  console.log(new Date().getTime());
  console.log(req.session);
  //kalau session ada. berikan parameter yang bisa mengaktifkan vote dan view++
  next();
});

//PROFILE
router.get("/profile/:id", Controller.profilePage);
router.post("/profile/:id", Controller.uploadedFile);
router.get("/profile/:profileId/photo/:photoId/delete", Controller.deletePhoto);
router.get("/photo/:id/delete", Controller.deletePhotoAdmin);

//PHOTO
router.get("/photo/:id", Controller.photoId);
router.get("/photo/:id/like", Controller.likePhoto);

module.exports = router;
