import express from "express";
import {
  getComments,
  postComment,
  updateComment,
  deleteComment,
  getOneComment
} from "../repository/commentRepo.mjs";

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  const response = await getComments();
  res.send(response);
});

commentRouter.get("/:getIndx", async (req, res) => {
  const index = req.params.getIndx
  const response = await getOneComment(index);
  res.send(response);
});

commentRouter.post("/", async (req, res) => {
  const { PostId, name, email, body } = req.body;
  const response = await postComment(PostId, name, email, body);
  res.send(response);
});
commentRouter.put("/:commentIndx", async (req, res) => {
  const { PostId, name, email, body } = req.body;
  const commentIndx = req.params.commentIndx;
  const response = await updateComment(PostId, name, email, body, commentIndx);
  res.send(response);
});
commentRouter.delete("/:commentIndx", async (req, res) => {
  const commentIndx = req.params.commentIndx;
  const response = await deleteComment(commentIndx);
  res.send(response);
});

export default commentRouter;
