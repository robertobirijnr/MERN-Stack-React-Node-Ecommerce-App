const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const braintreeController = require("../controllers/braintree");

router.get(
  "/braintree/getToken/:userId",
  authController.protect,
  authController.isAuth,
  braintreeController.generateToken
);
router.param("userId", userController.userById);

module.exports = router;
