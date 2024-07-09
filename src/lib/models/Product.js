import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  gallery: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  fitment: {
    type: String,
    required: true,
  },
  characteristics: {
    type: String,
    required: true,
  },
});

export const Product =
  mongoose.models?.Product || mongoose.model("Product", ProductSchema);
