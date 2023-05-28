import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  nameProduct: {
    type: String,
  },
  caloriesPer100g: {
    type: Number,
  }
}, {versionKey: false})

const Product = model("Product", productSchema); 
export default Product;