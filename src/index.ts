require("dotenv").config();
import mongoose from "mongoose";
import app from "./app";

const main = async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("connected to mongodb");

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
  });
};
main().catch((err) => console.log(err));
