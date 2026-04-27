import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 96,
    },
    
    date: {
      type: Date,
      required: true,
    },
    
    isDone: {
      type: Boolean,
      default: false,
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

