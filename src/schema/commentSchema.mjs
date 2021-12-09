import  Sequelize  from "sequelize";

const {DataTypes} = Sequelize

const commentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  PostId: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: "Posts",
      },
      key: "id",
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
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

export default commentSchema;
