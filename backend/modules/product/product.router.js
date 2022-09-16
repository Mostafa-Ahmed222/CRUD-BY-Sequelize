import { Router } from "express";
import {
  addProduct,
  deleteAllProduct,
  deleteProduct,
  getAllProduct,
  getAlltrash,
  getProductById,
  productSearch,
  restoreData,
  searchproductByName,
  searchproductByprice,
  softDelete,
  updateProduct,
} from "./controller/product.js";

const router = Router();

router.get("/user/:id", getAllProduct);
router.get("/trash/:id", getAlltrash);
router.get("/searchname/:id", searchproductByName);
router.get("/searchprice/:id", searchproductByprice);
router.get("/sdelete/:id", softDelete);
router.get("/restore/:id", restoreData);
router.get("/search", productSearch);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.delete("/delete", deleteAllProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
