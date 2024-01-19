//const Router = require("express");
//const router = new Router();
const router = require("express").Router();

const typeRouter = require("./typeRouter");
const mailRouter = require("./mailRouter");

//router.use("/cards", typeRouter);
router.use("/mails", mailRouter);

module.exports = router;
