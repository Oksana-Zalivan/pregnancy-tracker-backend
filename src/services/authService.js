import { User } from "../models/User.js";

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("Користувач з таким email вже існує");
  }

  const user = await User.create(payload);

  return user;
};
