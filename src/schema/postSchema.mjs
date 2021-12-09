import Sequelize from "sequelize";
const {DataTypes}  = Sequelize;
const postSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: "Users",
      },
      key: "id",
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export default postSchema;
