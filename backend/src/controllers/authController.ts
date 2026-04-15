import { Request, Response } from "express";
import { User } from "../models";
import { comparePassword, hashPassword, signToken } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    email,
    passwordHash: await hashPassword(password)
  });

  res.status(201).json({ token: signToken(user.id), user: { id: user.id, email: user.email } });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.json({ token: signToken(user.id), user: { id: user.id, email: user.email } });
};
