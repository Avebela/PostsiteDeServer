//const Router = require("express");
//const router = new Router();
const router = require("express").Router();
const mailController = require("../controllers/mailController");

router.post("/", mailController.create);
router.get("/", mailController.getAll);
router.get("/:id", mailController.getOne);
router.put("/", mailController.update);
router.delete("/:id", mailController.delete);

module.exports = router;
