//const Router = require("express");
//const router = new Router();
const router = require("express").Router();

const typeRouter = require("./typeRouter");

router.use("/cards", typeRouter);

module.exports = router;
