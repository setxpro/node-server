const {
  register,
  findOneUser,
  findAllUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

const {
  sellbieRelatorySales,
  sellbieSalesFlex,
  token,
  sendrelatories,
} = require("../Controllers/SellbieController");

const router = require("express").Router();

router.post("/create-user", register);
router.get("/get-user", findAllUser);
router.get("/get-user/:_id", findOneUser);
router.patch("/update-user/:_id", updateUser);
router.delete("/delete-user/:_id", deleteUser);

router.post("/send-token", token);

router.get("/sellbie-sales-flex/:dataInicio/ate/:dataFim", sellbieSalesFlex);
router.get(
  "/sellbie-sales-relatory/:dataInicio/ate/:dataFim",
  sellbieRelatorySales
);

router.post("/send-relatories", sendrelatories);

module.exports = router;
