const expres = require("express");
const router = expres.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.get(
  "/scret/:userId",
  authController.protect,
  authController.isAuth,
  (req, res) => {
    res.json({
      user: req.profile
    });
  }
);

router.get(
  "/user/:userId",
  authController.protect,
  authController.isAuth,
  userController.viewProfile
);

router.put(
  "/user/:userId",
  authController.protect,
  authController.isAuth,
  userController.updateProfile
);
router.get(
  "/orders/by/user/:userId",
  authController.protect,
  authController.isAuth,
  userController.getPurchasedHistory
);

router.param("userId", userController.userById);

module.exports = router;
