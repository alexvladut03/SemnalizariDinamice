import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
