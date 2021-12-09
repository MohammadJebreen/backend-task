import express from "express";
import {
  getPosts,
  postPost,
  updatePost,
  deletePost,
  getOnePost
} from "../repository/postRepo.mjs";

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const response = await getPosts();
  res.send(response);
});
postRouter.get("/:getIndx", async (req, res) => {
  const index = req.params.getIndx;
  const response = await getOnePost(index);
  res.send(response);
});
postRouter.post("/", async (req, res) => {
  const { UserId, title, body } = req.body;
  const response = await postPost(UserId, title, body);
  res.send(response);
});
postRouter.put("/:postIndx", async (req, res) => {
  const { UserId, title, body } = req.body;
  const postIndx = req.params.postIndx;
  const response = await updatePost(UserId, title, body, postIndx);
  res.send(response);
});
postRouter.delete("/:postIndx", async (req, res) => {
  const postIndx = req.params.postIndx;
  const response = await deletePost(postIndx);
  res.send(response);
});

export default postRouter;
