const router = require("express").Router();
const Controller = require("../controllers/controller");

//LOGIN
router.get("/login", Controller.login);
router.post("/login", Controller.loginPost);
//REGISTER
router.get("/register", Controller.register);
router.post("/register", Controller.registerPost);

module.exports = router;
