import commentModel from "../models/comments.mjs";

const getComments = () => {
  return commentModel.findAll();
};

const getOneComment = (index) => {
  return commentModel.findOne({ where: { id: index } });
};

const postComment = async (PostId, name, email, body) => {
  await commentModel.create({
    PostId: PostId,
    name: name,
    email: email,
    body: body,
  });
  return commentModel.findAll();
};

const updateComment = async (PostId, name, email, body, commentIndx) => {
  await commentModel.update(
    { PostId: PostId, name: name, email: email, body: body },
    {
      where: {
        id: commentIndx,
      },
    }
  );
  return commentModel.findAll();
};

const deleteComment = async (commentIndx) => {
  await commentModel.destroy({
    where: {
      id: commentIndx,
    },
  });
  return commentModel.findAll();
};

export {
  getComments,
  postComment,
  updateComment,
  deleteComment,
  getOneComment,
};
