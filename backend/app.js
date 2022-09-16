/* 
Name : Mostafa Ahmed Mohamed
Group : C38 Saturday 10Am Node.js
Assignment : 5
*/
import express from "express";
import { darwTables } from "./DB/connection.js";
import * as indexRouter from "./index.router.js";
import { productModle } from "./model/Product.js";
import { userModel } from "./model/User.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(express.json())
app.use(cors())
darwTables()

app.use('/api/v1/user', indexRouter.userRouter)
app.use('/api/v1/product', indexRouter.productRouter)
userModel.hasMany(productModle, {
  onDelete : "CASCADE",
  onUpdate : "CASCADE"
})
productModle.belongsTo(userModel)

app.get("*", (req, res, next) => {
  res.json({ message: "404 Not Found" });
});
app.listen(port, () => {
  console.log("Server is running.........");
});
