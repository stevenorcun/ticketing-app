import mongoose from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 3000;
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be priveded");
  if (!process.env.MONGO_URI) throw new Error("MONGO URI must be priveded");
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to MongoDb...`);
  } catch (error) {
    console.log("error");
  }
  app.listen(port, () => {});
};

start();
