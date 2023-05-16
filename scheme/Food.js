import { Schema, model, Types } from "mongoose";
import User from "./User.js"

const foodSchema = new Schema({
  nameFood: {
    type: String,
    required: true
  },
  weightFood: {
    type: Number,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    ref: "User"
  }
}, { versionKey: false })

const Food = model("Food", foodSchema);

export default Food;