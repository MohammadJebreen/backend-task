import userModel from "../models/user.mjs";

const getUser = async () => {
  const users = await userModel.findAll();
  return users;
};

const postUser = async (name, email, phone) => {
  await userModel.create({ name: name, email: email, phone: phone });
  return userModel.findAll();
};

const updateUser = async (name, email, phone, userIndx) => {
  await userModel.update(
    { name: name, email: email, phone: phone },
    {
      where: {
        id: userIndx,
      },
    }
  );
  return userModel.findAll();
};

const deleteUser = async (userIndx) => {
  await userModel.destroy({
    where: {
      id: userIndx,
    },
  });
  return userModel.findAll();
};

export { getUser, postUser, updateUser, deleteUser };
