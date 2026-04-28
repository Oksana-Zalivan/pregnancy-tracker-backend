import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    date: {
      type: Date,
      default: Date.now,
    },

    emotions: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length >= 1 && value.length <= 12,
        message: "Оберіть від 1 до 12 емоцій",
      },
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diary", diarySchema);