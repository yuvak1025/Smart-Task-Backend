import Task from "../models/Task.js";
import { successResponse, errorResponse } from "../utils/response.js";

// ✅ Create task
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const userId = req.userId;

    if (!title) return errorResponse(res, "Title is required", 400);

    const newTask = await Task.create({
      title,
      description,
      status: "Pending",
      priority: priority || "Medium",
      due_date,
      user: userId,
    });

    return successResponse(res, newTask, "Task created successfully", 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Server error");
  }
};

// ✅ Get all tasks for user
export const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ user: userId });
    return successResponse(res, tasks, "Tasks fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
};

// ✅ 🔥 NEW: Get single task by ID
export const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) return errorResponse(res, "Task not found", 404);

    return successResponse(res, task, "Task fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
};

// ✅ Update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, status, due_date, priority } = req.body;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) return errorResponse(res, "Task not found", 404);

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (due_date) task.due_date = due_date;
    if (priority) task.priority = priority;

    await task.save();
    return successResponse(res, task, "Task updated successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
};

// ✅ Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) return errorResponse(res, "Task not found", 404);

    return successResponse(res, {}, "Task deleted successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
};

// ✅ Filter tasks
export const filterTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { status, priority, due_date } = req.query;

    let filter = { user: userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (due_date) filter.due_date = { $lte: new Date(due_date) };

    const tasks = await Task.find(filter);
    return successResponse(res, tasks, "Filtered tasks fetched successfully");
  } catch (err) {
    console.error(err);
    return errorResponse(res);
  }
};
