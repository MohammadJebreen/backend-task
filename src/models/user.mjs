import sequelize from "../sequelizeConnection/connection.mjs";

import userSchema from "../schema/userSchema.mjs";

const user = sequelize.define("Users", userSchema, {
  sequelize,
  modelName: "Users",
  freezeTableName: true,
  tableName: "Users",
});

export default user;