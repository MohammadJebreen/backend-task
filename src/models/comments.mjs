import sequelize from "../sequelizeConnection/connection.mjs";
import commentSchema from "../schema/commentSchema.mjs";
import post from "./post.mjs";

const comment = sequelize.define("Comments", commentSchema, {
  sequelize,
  modelName: "Comments",
  freezeTableName: true,
  tableName: "Comments",
});

post.hasMany(comment);
comment.belongsTo(post, { constraints: true, onDelete: "cascade" });

export default comment;