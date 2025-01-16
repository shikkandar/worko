import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { jwtPayloadSchema } from "../schema/index";
import UserModel from "../models/user.schema";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const payload = jwtPayloadSchema.parse(decoded);

    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(401).json({ message: "Please authenticate" });
    }
  }
};

export const adminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await auth(req, res, () => {});

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserModel.findById(req.userId).select("role").lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const empAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await auth(req, res, () => {});

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserModel.findById(req.userId).select("role").lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== "emp") {
      res.status(403).json({ message: "Access denied. emp role required." });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const empOrAdminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await auth(req, res, () => {});

    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserModel.findById(req.userId).select("role").lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === "emp" || user.role === "admin") {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access denied. Employee or Admin role required." });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
