const expres = require("express");
const router = expres.Router();
const productController = require("../controllers/product");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.get("/product/:productId", productController.read);
router.post(
  "/product/create/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  productController.create
);
router.put(
  "/product/:productId/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  productController.update
);

router.delete(
  "/product/:productId/:userId",
  authController.protect,
  authController.isAuth,
  authController.isAdmin,
  productController.remove
);

router.get("/products", productController.getAllProducts);
router.get(
  "/products/related/:productId",
  productController.getRelatedProducts
);
router.get("/products/categories", productController.getProductsCategories);
router.post("/products/by/search", productController.listBySearch);
router.get("/products/search", productController.listSearch);
router.get("/product/photo/:productId", productController.getProductPhoto);

router.param("userId", userController.userById);
router.param("productId", productController.productById);
module.exports = router;
