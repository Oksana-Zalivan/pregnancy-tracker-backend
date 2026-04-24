import { Schema, model } from "mongoose";

const diarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    emotions: {
      type: [Schema.Types.ObjectId],
      ref: "emotion",
      required: true,
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 12,
        message: "emotions must have between 1 and 12 items",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Diary = model("diary", diarySchema);