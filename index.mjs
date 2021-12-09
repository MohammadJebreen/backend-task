import express from "express";
import cors from "cors";
import userRouter from "./src/router/userRouter.mjs";
import postRouter from "./src/router/postRouter.mjs";
import commentRouter from "./src/router/commentRouter.mjs";
import dotenv from "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`port on ${PORT}`);
});

export default app;
