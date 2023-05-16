import { Schema, model, Types } from "mongoose";
import Food from "./Food.js";

const userScheme = new Schema({
  email: {
    type: String, 
    required: true,
    // minLength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minLength: 6,
  },
  norma: {
    type: Number,
  },
  food: [{
    type: Types.ObjectId,
    ref: "Food"
  }]
}, {versionKey: false})

const User = model("User", userScheme);

export default User;