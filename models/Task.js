import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  priority: {                  // New field
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  due_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", taskSchema);
