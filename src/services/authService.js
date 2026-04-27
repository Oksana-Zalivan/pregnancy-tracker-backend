import { User } from "../models/User.js";
import crypto from "crypto";

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("Користувач з таким email вже існує");
  }

  const user = await User.create(payload);

  return user;
};

// This is the User Login logic
export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error("Користувач з таким email чи паролем не існує!");
  }

  return user;
};

// This is the User password logic
export const passwordUser = async (payload) => {
  const userPassword = await User.findOne({ password: payload.password });

  return userPassword;
};
