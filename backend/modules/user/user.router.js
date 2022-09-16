import { Router } from "express";
import {
  addUser,
  deleteAllUser,
  deleteUser,
  gettAllUser,
  gettUserInAgeRange,
  getUserById,
  getUserGreaterInAge,
  getUserlessInAge,
  searchuserByName,
  updateUser,
  userLogin,
} from "./controller/user.js";

const router = Router();

router.post("/login", userLogin);
router.post("/signup", addUser);
router.get("/", gettAllUser);
router.get("/search", searchuserByName);
router.get("/between", gettUserInAgeRange);
router.get("/greater", getUserGreaterInAge);
router.get("/less", getUserlessInAge);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/delete", deleteAllUser);
router.delete("/delete/:id", deleteUser);

export default router;
