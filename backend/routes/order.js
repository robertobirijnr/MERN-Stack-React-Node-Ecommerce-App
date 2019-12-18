const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const orderController = require("../controllers/order");

router.post(
  "/order/create/:userId",
  authController.protect,
  authController.isAuth,
  userController.userOrderHistory,
  orderController.createOrder
);

router.param("userId", userController.userById);

module.exports = router;
