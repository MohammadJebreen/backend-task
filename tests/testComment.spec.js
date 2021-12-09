import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs";
import userModel from "../src/models/user.mjs";
import postModel from "../src/models/post.mjs";
import commentModel from "../src/models/comments.mjs";

chai.use(chaiHttp);
chai.should();

after(async () => await commentModel.destroy({ where: {}, force: true }));

describe("GET:/comments", () => {
  it("should get empty array from empty comment table", async () => {
    const res = await chai.request(app).get("/comments");
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(0);
  });
});

describe("GET:/commentData", () => {
  it("should get error 404 from wrong router", async () => {
    const res = await chai.request(app).get("/commentData");
    res.should.have.status(404);
  });
});

describe("Create, POST:/comments", () => {
  it("should add comment to comments table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const post = await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    const data = {
      PostId: post.dataValues.id,
      name: "ali",
      email: "ali@gmail.com",
      body: "this is a body",
    };
    const res = await chai.request(app).post("/comments").send(data);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].name.should.equal("ali");
  });
});

describe("GET:/comments/:getIndx", () => {
  it("should get one comments base on id number", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const post = await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    const comment = await commentModel.create({
      PostId: post.dataValues.id,
      name: "mohammad",
      email: "mohammad@gmail.com",
      body: "i am mohammad",
    });
    const res = await chai
      .request(app)
      .get(`/comments/${comment.dataValues.id}`);
    res.should.have.status(200);
    res.body.should.be.a("Object");
    res.body.email.should.equal("mohammad@gmail.com");
  });
});

describe("Update, PUT:/comments/:commentIndx", () => {
  it("should update comment from comments table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const post = await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    const comment = await commentModel.create({
      PostId: post.dataValues.id,
      name: "mohammad",
      email: "mohammad@gmail.com",
      body: "i am mohammad",
    });
    const data = {
      PostId: post.dataValues.id,
      name: "ali",
      email: "ali@gmail.com",
      body: "this is a body",
    };
    const res = await chai
      .request(app)
      .put(`/comments/${comment.dataValues.id}`)
      .send(data);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].name.should.equal("ali");
  });
});

describe("Delete , DELETE:/comments/commentIndx", () => {
  it("should delete comment from comments table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const post = await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    const comment = await commentModel.create({
      PostId: post.dataValues.id,
      name: "mohammad",
      email: "mohammad@gmail.com",
      body: "i am mohammad",
    });
    const resData = await chai.request(app).get("/comments");
    const res = await chai
      .request(app)
      .delete(`/comments/${comment.dataValues.id}`);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(resData.body.length - 1);
  });
});

describe("Delete , DELETE:/posts/postsIndx", () => {
  it("it should delete comment from comments table if parent post deleted as well", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const post = await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    await commentModel.create({
      PostId: post.dataValues.id,
      name: "mohammad",
      email: "mohammad@gmail.com",
      body: "i am mohammad",
    });
    const resData = await chai.request(app).get(`/comments`);
    const numberComment = resData.body.filter(
      (element) => element.PostId === post.dataValues.id
    );
    await chai.request(app).delete(`/posts/${post.dataValues.id}`);
    const res = await chai.request(app).get(`/comments`);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(resData.body.length - numberComment.length);
  });
});
