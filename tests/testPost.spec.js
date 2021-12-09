import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs";
import userModel from "../src/models/user.mjs";
import postModel from "../src/models/post.mjs";

chai.use(chaiHttp);
chai.should();

after(
  async () =>
    await postModel.destroy({ where: {}, truncate: true, force: true })
);

describe("GET:/posts", () => {
  it("should get empty array from empty post table", async () => {
    await postModel.destroy({ where: {}, truncate: true, force: true });
    const res = await chai.request(app).get("/posts");
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(0);
  });
});

describe("GET:/postsData", () => {
  it("should get error 404 from wrong router", async () => {
    const res = await chai.request(app).get("/postsData");
    res.should.have.status(404);
  });
});

describe("Create , POST:/posts ", () => {
  it("should add new post to posts table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const data = {
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    };
    const res = await chai.request(app).post("/posts").send(data);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].title.should.equal("it was a good day");
  });
});

describe("GET:/posts/getIndx", () => {
  it("should get one post base on id number", async () => {
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
    const res = await chai.request(app).get(`/posts/${post.dataValues.id}`);
    res.should.have.status(200);
    res.body.should.be.a("Object");
    res.body.title.should.equal("it was a good day");
  });
});

describe("Update , PUT:/posts/:postsIndx", () => {
  it("should update post from posts table", async () => {
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
      UserId: user.dataValues.id,
      title: "why it was a good day",
      body: "because it was sunny day",
    };
    const res = await chai
      .request(app)
      .put(`/posts/${post.dataValues.id}`)
      .send(data);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].title.should.equal("why it was a good day");
  });
});

describe("Delete , DELETE:/posts", () => {
  it("should delete post from posts table", async () => {
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
    const resData = await chai.request(app).get(`/posts`);
    const res = await chai.request(app).delete(`/posts/${post.dataValues.id}`);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(resData.body.length - 1);
  });
});

describe("Delete , DELETE:/users/:userIndx", () => {
  it("should delete the posts if parent user deleted", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    await postModel.create({
      UserId: user.dataValues.id,
      title: "it was a good day",
      body: "it was sunny day",
    });
    const resData = await chai.request(app).get(`/posts`);
    const numberPosts = resData.body.filter(
      (element) => element.UserId === user.dataValues.id
    );
    await chai.request(app).delete(`/users/${user.dataValues.id}`);
    const res = await chai.request(app).get(`/posts`);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(resData.body.length - numberPosts.length);
  });
});
