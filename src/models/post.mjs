import sequelize from "../sequelizeConnection/connection.mjs";
import postSchema from "../schema/postSchema.mjs";
import user from "./user.mjs";

const post = sequelize.define("Posts", postSchema, {
  sequelize,
  modelName: "Posts",
  freezeTableName: true,
  tableName: "Posts",
});

user.hasMany(post);
post.belongsTo(user, { constraints: true, onDelete: "cascade" });

export default post;