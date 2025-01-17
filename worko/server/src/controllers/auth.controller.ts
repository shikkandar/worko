import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import UserModel from "../models/user.schema";
import { loginSchema, registerSchema } from "../schema";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = registerSchema.parse(req.body);
    console.log(req.body);

    const existingUser = await UserModel.findOne({
      email: validatedData.email,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      saltRounds
    );

    const newUser = new UserModel({
      ...validatedData,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await UserModel.findOne({ email: validatedData.email }).select(
      "+password"
    );
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!user.password) {
      console.error(`User ${user._id} has no password set`);
      res.status(500).json({ message: "Login failed due to server error" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.name,
        jobTitle: user.jobTitle,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    } else if (error instanceof Error) {
      res.status(500).json({ message: "Login failed", error: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}
