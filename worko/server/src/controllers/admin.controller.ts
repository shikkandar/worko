import { Request, Response } from "express";
import UserModel from "../models/user.schema";
import ReferralModel from "../models/referral.schema";
import { z } from "zod";

// Input validation schemas
const updateUserRoleSchema = z.object({
  userId: z.string(),
  newRole: z.enum(["user", "admin", "emp"]),
});

const updateReferralStatusSchema = z.object({
  referralId: z.string(),
  newStatus: z.enum(["pending", "accepted", "rejected", "cancelled"]),
});

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.find({}).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllReferrals = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const referrals = await ReferralModel.find({})
      .populate("referrer")
      .populate("referred");
    res.status(200).json({ referrals });
  } catch (error) {
    console.error("Error fetching all referrals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, newRole } = updateUserRoleSchema.parse(req.body);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    } else {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateReferralStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { referralId, newStatus } = updateReferralStatusSchema.parse(
      req.body
    );

    const updatedReferral = await ReferralModel.findByIdAndUpdate(
      referralId,
      { status: newStatus },
      { new: true, runValidators: true }
    );

    if (!updatedReferral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }

    res.status(200).json({
      message: "Referral status updated successfully",
      referral: updatedReferral,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid input", errors: error.errors });
    } else {
      console.error("Error updating referral status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteReferral = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { referralId } = req.params;

    if (!referralId) {
      res.status(400).json({ message: "Referral ID is required" });
      return;
    }

    const deletedReferral = await ReferralModel.findByIdAndDelete(referralId);

    if (!deletedReferral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }

    res.status(200).json({ message: "Referral deleted successfully" });
  } catch (error) {
    console.error("Error deleting referral:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
