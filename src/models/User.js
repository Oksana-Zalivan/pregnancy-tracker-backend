import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 64,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },
    gender: {
      type: String,
      enum: ["boy", "girl", null],
      default: null,
    },
    dueDate: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;