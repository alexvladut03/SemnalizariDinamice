import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const Category =
  mongoose.models?.Category || mongoose.model("Category", CategorySchema);
