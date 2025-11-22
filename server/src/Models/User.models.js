import mongoose from "mongoose";

const userschima = new mongoose.Schema(
  {
    name: {
       required: true,
   type: String},
    uid: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
       required: true,
    },
    photo: {
      type: String,
       required: true,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userschima);

export default UserData;
