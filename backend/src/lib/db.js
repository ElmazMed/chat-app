import mongoose from "mongoose";

export const connectDb = async (url) => {
  await mongoose.connect(url);
};
