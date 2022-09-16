import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("ass5", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const darwTables = async () => {
  return await sequelize
    .sync({ alter: true })
    .then((result) => {
      console.log("Connect to DB");
    })
    .catch((error) => {
      console.log("fail to connect to DB", error);
    });
};
