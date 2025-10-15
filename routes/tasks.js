import express from "express";
import auth from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  getTaskById,    // ✅ Newly added import
  deleteTask,
  updateTask,
  filterTasks
} from "../controllers/taskController.js";

const router = express.Router();

// ✅ Create a new task
router.post("/", auth, createTask);

// ✅ Get all tasks for the logged-in user
router.get("/", auth, getTasks);

// ✅ Get a single task by its ID (NEW)
router.get("/:id", auth, getTaskById);

// ✅ Update a task by ID
router.put("/:id", auth, updateTask);

// ✅ Delete a task by ID
router.delete("/:id", auth, deleteTask);

// ✅ Filter tasks by status, priority, or due date
router.get("/filter", auth, filterTasks);

export default router;
