import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  emotions: [
    {
      title: String,
    },
  ],
});

export default mongoose.model("Diary", diarySchema);