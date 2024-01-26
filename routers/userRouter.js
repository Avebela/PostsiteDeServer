//const Router = require("express");
//const router = new Router();
const router = require("express").Router();
const userController = require("../controllers/userController");

const { auth } = require("../middleware/auth.js");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/current", auth, userController.current);
router.post("/", userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.put("/", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
