import mongoose from "mongoose";

const mealSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    status:{type:Boolean,required:true},
    dueDate: { type: Date, required: true },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "userAuth",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const tasks = mongoose.model("tasks", mealSchema);

export default tasks;
