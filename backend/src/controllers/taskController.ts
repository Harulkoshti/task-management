import { Request, Response } from "express";
import { Order } from "sequelize";
import { Task } from "../models";

const getSortOrder = (sortBy?: string): Order => {
  switch (sortBy) {
    case "dueDate":
      return [["dueDate", "ASC"]];
    case "priority":
      return [["priority", "DESC"]];
    case "createdAt":
    default:
      return [["createdAt", "DESC"]];
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { status, priority, sortBy } = req.query as {
    status?: "pending" | "completed";
    priority?: "low" | "medium" | "high";
    sortBy?: "dueDate" | "priority" | "createdAt";
  };

  const where: Record<string, unknown> = { userId: req.userId };
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const tasks = await Task.findAll({
    where,
    order: getSortOrder(sortBy)
  });

  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(task);
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate, priority, status } = req.body as {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: "low" | "medium" | "high";
    status?: "pending" | "completed";
  };

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const task = await Task.create({
    userId: req.userId as number,
    title,
    description: description || null,
    dueDate: dueDate ? new Date(dueDate) : null,
    priority: priority || "medium",
    status: status || "pending"
  });

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  const { title, description, dueDate, priority, status } = req.body as {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: "low" | "medium" | "high";
    status?: "pending" | "completed";
  };

  await task.update({
    title: title ?? task.title,
    description: description ?? task.description,
    dueDate: dueDate ? new Date(dueDate) : dueDate === null ? null : task.dueDate,
    priority: priority ?? task.priority,
    status: status ?? task.status
  });

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const deleted = await Task.destroy({ where: { id: req.params.id, userId: req.userId } });
  if (!deleted) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(204).send();
};
