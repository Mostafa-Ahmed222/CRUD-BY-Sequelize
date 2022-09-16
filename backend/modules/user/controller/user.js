import { productModle } from "../../../model/Product.js";
import { userModel } from "../../../model/User.js";
import { Op } from "sequelize";

export const gettAllUser = async (req, res, next) => {
  try {
    const user = await userModel.findAll({
      order: ["id"],
      include: [{ model: productModle }],
    });
    if (user.length) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "No User Exist" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({
      include: [{ model: productModle }],
      where: {
        id,
      },
    });
    res.json({ message: "Done", user });
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.update(req.body, {
      where: {
        id,
      },
    });
    if (user[0]) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account", user });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.destroy({
      where: {
        id,
      },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account", user });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
export const deleteAllUser = async (req, res, next) => {
  try {
    const user = await userModel.destroy({
      truncate: true,
    });
    if (!user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "invalid account", user });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};
// Ranges
export const gettUserInAgeRange = async (req, res, next) => {
  const { start, end } = req.query;
  try {
    const user = await userModel.findAll({
      order: ["id"],
      include: [{ model: productModle }],
      where: {
        age: {
          [Op.between]: [start, end],
        },
      },
    });
    if (user.length) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "No User Exist" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const getUserGreaterInAge = async (req, res, next) => {
  const { start } = req.query;
  try {
    const user = await userModel.findAll({
      order: ["id"],
      include: [{ model: productModle }],
      where: {
        age: {
          [Op.gt]: start,
        },
      },
    });
    if (user.length) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "No User Exist" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const getUserlessInAge = async (req, res, next) => {
  const { end } = req.query;
  try {
    const user = await userModel.findAll({
      order: ["id"],
      include: [{ model: productModle }],
      where: {
        age: {
          [Op.lt]: end,
        },
      },
    });
    if (user.length) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "No User Exist" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const searchuserByName = async (req, res, next) => {
  const { key } = req.query;
  try {
    const user = await userModel.findAll({
      order: ["id"],
      include: [{ model: productModle }],
      where: {
        userName: {
          [Op.startsWith]: `${key}`,
        },
      },
    });
    if (user.length) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "No User Exist" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
// login and signup
export const addUser = async (req, res, next) => {
  try {
    const { userName, age, email, password, phone } = req.body;
    // const user = await userModel.create(req.body);
    const user = await userModel.create({
      userName,
      age,
      email,
      password,
      phone,
    });
    res.json({ message: "Done", user });
  } catch (error) {
    if (error?.original?.errno == 1062) {
      res.json({ message: "Email Exist" });
    } else {
      res.json({ message: "catch error", error });
    }
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({
      where: {
        email,
        password,
      },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "Invalid Account", user });
    }
    
  } catch (error) {
    res.json({ message: "Query error" }, error);
  }
};
