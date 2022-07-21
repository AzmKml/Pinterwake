const router = require("express").Router();
const Controller = require("../controllers/controller");

//LOGIN
router.get("/login", Controller.login);
//REGISTER
router.get("/register", Controller.register);
router.post("/register", Controller.registerPost);

module.exports = router;
