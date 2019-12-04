const expres = require("express");
const router = expres.Router();
const categoryController = require("../controllers/category");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.get("/category/:categoryId", categoryController.getCategory);
router.get("/categories", categoryController.getAllCategories);

router.post(
  "/category/create/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  categoryController.createCategory
);
router.put(
  "/category/:categoryId/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  categoryController.updateCategory
);
router.delete(
  "/category/:categoryId/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  categoryController.deleteCategory
);

router.param("userId", userController.userById);
router.param("categoryId", categoryController.categoryById);
module.exports = router;
