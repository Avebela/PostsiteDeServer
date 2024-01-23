//const Router = require("express");
//const router = new Router();
const router = require("express").Router();

const typeRouter = require("./typeRouter");
const mailRouter = require("./mailRouter");
const userRouter = require("./userRouter");

router.use("/cards", typeRouter);
router.use("/mails", mailRouter);
router.use("/user", userRouter);

module.exports = router;
