//const Router = require("express");
//const router = new Router();
const router = require("express").Router();
const commentController = require("../controllers/commentController.js");

const { auth } = require("../middleware/auth.js");
router.post("/", auth, commentController.create);
router.get("/:userId", auth, commentController.getAllforUser);

router.get("/", auth, commentController.getAll);

router.get("/:id", auth, commentController.getOne);

router.put("/", auth, commentController.update);
router.delete("/", auth, commentController.delete);

module.exports = router;
