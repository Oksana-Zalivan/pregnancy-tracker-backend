import mongoose from "mongoose";

export const initMongoConnection = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined");
  }

  await mongoose.connect(mongoUrl);

  console.log("Mongo connection successfully established");
};
