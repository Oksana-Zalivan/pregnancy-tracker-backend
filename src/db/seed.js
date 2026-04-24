import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const removeIds = (data) => data.map(({ _id, ...rest }) => rest);

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const momStates = JSON.parse(
      await fs.readFile("./src/db/data/mom_states.json", "utf-8")
    );

    const babyStates = JSON.parse(
      await fs.readFile("./src/db/data/baby_states.json", "utf-8")
    );

    const emotions = JSON.parse(
      await fs.readFile("./src/db/data/emotions.json", "utf-8")
    );

    await mongoose.connection.collection("momStates").deleteMany({});
    await mongoose.connection.collection("babyStates").deleteMany({});
    await mongoose.connection.collection("emotions").deleteMany({});

    await mongoose.connection
      .collection("momStates")
      .insertMany(removeIds(momStates));

    await mongoose.connection
      .collection("babyStates")
      .insertMany(removeIds(babyStates));

    await mongoose.connection
      .collection("emotions")
      .insertMany(removeIds(emotions));

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
