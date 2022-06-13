import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    token: { type: String, default:null}
 
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const User = mongoose.model("user", userSchema);

export default User;
