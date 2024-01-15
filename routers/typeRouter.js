//const Router = require("express");
//const router = new Router();
const router = require("express").Router();
const typeController = require("../controllers/typeController");

router.post("/", typeController.create);
router.get("/", typeController.getAll);
router.get("/:id", typeController.getOne);
router.put("/", typeController.update);
router.delete("/:id", typeController.delete);

module.exports = router;
