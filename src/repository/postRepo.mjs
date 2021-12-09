import postModel from "../models/post.mjs";

const getPosts = () => {
  return postModel.findAll();
};

const getOnePost = (index) => {
  return postModel.findOne({ where: { id: index } });
};

const postPost = async (UserId, title, body) => {
  await postModel.create({ UserId: UserId, title: title, body: body });
  return postModel.findAll();
};

const updatePost = async (UserId, title, body, postIndx) => {
  await postModel.update(
    { UserId: UserId, title: title, body: body },
    {
      where: {
        id: postIndx,
      },
    }
  );
  return postModel.findAll();
};

const deletePost = async (postIndx) => {
  await postModel.destroy({
    where: {
      id: postIndx,
    },
  });
  return postModel.findAll();
};

export { getPosts, postPost, updatePost, deletePost, getOnePost };
