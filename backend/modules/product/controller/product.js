import { Op } from "sequelize";
import { productModle } from "../../../model/Product.js";
import { userModel } from "../../../model/User.js";

export const getAllProduct = async (req, res, next) => {
  const {id} = req.params
  try {
    const product = await productModle.findAll({
      attributes : ["name", "price", "id", "deletedAt"],
      include: [{ model: userModel, attributes: ["userName"], where : {
        id,
      }}],
      where : {
        deletedAt : true
      }
    });
    res.json({ message: "Done", product });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.findOne({
      include: [{ model: userModel, attributes: ["userName", "email"] }],
      where: {
        id,
      },
    });
    res.json({ message: "Done", product });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const addProduct = async (req, res, next) => {
  const { name, price,UserId } = req.body;
  try {
    const product = await productModle.create({
      name,
      price,
      UserId,
      quantity : 1
    });
    res.json({ message: "Done", product });
  } catch (error) {
    res.json({message :"Catch error", error});
  }
};
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.update(req.body, {
      where: {
        id,
      },
    });
    if (product[0]) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid user", product });
    }
  } catch (error) {
    res.json("Catch error", error);
  }
};
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.destroy({
      where: {
        id,
      },
    });
    if (product) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid product", product });
    }
  } catch (error) {
    res.json("Catch error", error);
  }
};
export const deleteAllProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.destroy({
      truncate: true,
    });
    if (!product) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid data", product });
    }
  } catch (error) {
    res.json("Catch error", error);
  }
};
export const productSearch = async (req, res, next) => {
  const {key} = req.query
  try {
    const product = await productModle.findAll({
      include : [{model: userModel,
      attributes : ['userName', 'email']}],
      where : {
        name : {
          [Op.startsWith] : `${key}%`
        }
      }
    })
    res.json({message: "Done", product})
  } catch (error) {
    res.json({message:"catch error", error})
  }
}
export const softDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.update({deletedAt : false}, {
      where: {
        id,
      },
    });
    if (product[0]) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid user", product });
    }
  } catch (error) {
    res.json("Catch error", error);
  }
};
export const getAlltrash = async (req, res, next) => {
  const {id} = req.params
  try {
    const product = await productModle.findAll({
      attributes : ["name", "price", "id", "deletedAt"],
      include: [{ model: userModel, attributes: ["userName"], where : {
        id,
      }}],
      where : {
        deletedAt : false
      }
    });
    res.json({ message: "Done", product });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const restoreData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModle.update({deletedAt : true}, {
      where: {
        id,
      },
    });
    if (product[0]) {
      res.json({ message: "Done", product });
    } else {
      res.json({ message: "invalid user", product });
    }
  } catch (error) {
    res.json("Catch error", error);
  }
};
export const searchproductByName = async (req, res, next) => {
  const {id} = req.params
  const { key } = req.query;
  try {
    const product = await productModle.findAll({
      order: ["id"],
      where: {
        name: {
          [Op.startsWith]: `${key}`,
        },
        deletedAt : true,
          UserId : id
      },
    });
    res.json({ message: "Done", product });
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const searchproductByprice = async (req, res, next) => {
  const {id} = req.params
  const { key } = req.query;
  try {
    const product = await productModle.findAll({
      order: ["id"],
      where: {
        price: {
          [Op.startsWith]: key,
        },
        deletedAt : true,
          UserId : id
      },
    });
    res.json({ message: "Done", product });
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};