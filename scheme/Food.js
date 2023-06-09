import { Schema, model, Types } from "mongoose";

const foodSchema = new Schema({
  nameFood: {
    type: String,
  },
  weightFood: {
    type: Number,
  },
  caloriesFood: {
    type: Number,
  },
  dateFood: {
    
  },
  owner: {
    type: Types.ObjectId,
    ref: "User"
  }
}, { versionKey: false })

const Food = model("Food", foodSchema);

export default Food;