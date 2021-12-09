import express from "express";
import {
  getUser,
  postUser,
  updateUser,
  deleteUser,
} from "../repository/userRepo.mjs";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const response = await getUser();
  res.status(200).send(response);
});
userRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const response = await postUser(name, email, phone);
  res.send(response);
});
userRouter.put("/:userIndx", async (req, res) => {
  const { name, email, phone } = req.body;
  const userIndx = req.params.userIndx;
  const response = await updateUser(name, email, phone, userIndx);
  res.send(response);
});
userRouter.delete("/:userIndx", async (req, res) => {
  const userIndx = req.params.userIndx;
  const response = await deleteUser(userIndx);
  res.send(response);
});

export default userRouter;
