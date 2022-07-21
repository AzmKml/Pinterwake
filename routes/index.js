const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get('/', Controller.home)
router.get('/categories/:id', Controller.showByCategories)


module.exports = router;
