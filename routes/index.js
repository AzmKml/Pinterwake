const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/login", Controller.login);
router.get("/register", Controller.register);

module.exports = router;
