const expres = require("express");
const router = expres.Router();
const userController = require("../controllers/auth");
const { userSignupValidator } = require("../middlewares/index");

router.get("/", (req, res) => {
  res.send("hello Bob");
});

router.post("/signup", userSignupValidator, userController.signup);
router.post("/signin", userController.signin);
router.get("/signout", userController.signout);

//testing protected routes
router.get("/hello", userController.protect, (req, res) => {
  res.send("Hello Bob");
});

module.exports = router;
