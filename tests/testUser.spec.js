import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs";
import userModel from "../src/models/user.mjs";

chai.use(chaiHttp);
chai.should();

before(
  async () =>
    await userModel.destroy({ where: {}, truncate: true, force: true })
);

describe("GET:/users", () => {
  it("should get empty array from empty user table", async () => {
    await userModel.destroy({ where: {}, truncate: true, force: true })
    const res = await chai.request(app).get("/users");
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(0);
  });
});

describe("GET:/usersData", () => {
  it("it should GET error 404 from wrong router", async () => {
    const res = await chai.request(app).get("/usersData");
    res.should.have.status(404);
  });
});

describe("Create, POST:/users", () => {
  it("should add new user to user table", async () => {
    const data = {
      name: "ali",
      email: "ali@gmail.com",
      phone: "078-8875-7451",
    };
    const res = await chai.request(app).post("/users").send(data);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].name.should.equal("ali");
  });
});

describe("Update , PUT:/users/userIndx", () => {
  it("should update user info from user table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const dataUpdates = {
      name: "mohammad",
      email: "ali@gmail.com",
      phone: "078-8875-7451",
    };
    const res = await chai
      .request(app)
      .put(`/users/${user.dataValues.id}`)
      .send(dataUpdates);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body[res.body.length - 1].name.should.equal("mohammad");
  });
});

describe("Delete , DELETE:/users/userIndx", () => {
  it("should delete user info from user table", async () => {
    const user = await userModel.create({
      name: "Osman",
      email: "Osman@gmail.com",
      phone: "078-852-7453",
    });
    const resData = await chai.request(app).get(`/users`);
    const res = await chai.request(app).delete(`/users/${user.dataValues.id}`);
    res.should.have.status(200);
    res.body.should.be.a("array");
    res.body.length.should.be.eql(resData.body.length - 1);
  });
});
