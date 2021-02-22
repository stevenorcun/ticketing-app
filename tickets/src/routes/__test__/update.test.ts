import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if the provided id does not exists", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signup())
    .send({
      title: "Concert",
      price: 50,
    })
    .expect(404);
});
it("return 401 if the user is not authenticaed", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "Concert",
      price: 50,
    })
    .expect(401);
});
it("return 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signup())
    .send({
      title: "Concert",
      price: 50,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signup())
    .send({
      title: "TEST",
      price: 20,
    })
    .expect(401);
});
it("return 400 if the user provides an invalid title or price", async () => {});