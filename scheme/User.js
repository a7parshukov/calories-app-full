import { Schema, model } from "mongoose";

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
  }
}, {versionKey: false})

const User = model("User", userScheme);

export default User;