import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import UserModel from "../models/user.schema";
import { User } from "../schema";

export const getUserData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userDoc = await UserModel.findById(userId).lean();

    if (!userDoc) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user: User = {
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role as User["role"],
      jobTitle: userDoc.jobTitle as User["jobTitle"],
    };
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
    try {
      const users = await UserModel.find().lean();
      res.status(200).json(users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role as User["role"],
        jobTitle: user.jobTitle as User["jobTitle"],
      })));
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  
};
