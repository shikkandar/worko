import { Request, Response } from "express";
import UserModel from "../models/user.schema";
import ReferralModel from "../models/referral.schema";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Error as MongooseError } from "mongoose";
import { json } from "stream/consumers";

export const referUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { referredUserId } = req.body;
    const userId = req.userId;

    if (!userId || !referredUserId) {
      res.status(400).json({ message: "Missing user ID or referred user ID" });
      return;
    }

    if (userId === referredUserId) {
      res.status(400).json({ message: "Self-referral is not allowed" });
      return;
    }

    // Check if both users exist
    const [user, referredUser] = await Promise.all([
      UserModel.findById(userId),
      UserModel.findById(referredUserId),
    ]);

    if (!user) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    if (!referredUser) {
      res.status(404).json({ message: "Referred user not found" });
      return;
    }

    if (referredUser.role !== "user") {
      res.status(400).json({ message: "Only candidate can be referred" });
      return;
    }

    // Check if a referral already exists
    const existingReferral = await ReferralModel.findOne({
      referrer: userId,
      referred: referredUserId,
      status: { $in: ["pending", "accepted"] },
    });

    if (existingReferral) {
      res
        .status(400)
        .json({ message: "Referral already exists for this user" });
      return;
    }

    const newReferral = new ReferralModel({
      referrer: userId,
      referred: referredUserId,
      status: "pending",
    });

    await newReferral.save();

    res.status(201).json({
      message: "User referred successfully",
      referral: {
        id: newReferral._id,
        referrer: newReferral.referrer,
        referred: newReferral.referred,
        status: newReferral.status,
      },
    });
  } catch (error) {
    console.error("Error in referUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unreferUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { referralId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    // Find the referral and check if the current user is the referrer
    const referral = await ReferralModel.findOne({
      _id: referralId,
      referrer: userId,
    });

    if (!referral) {
      res
        .status(404)
        .json({ message: "Referral not found or not authorized to cancel" });
      return;
    }

    // Update the referral status to cancelled
    referral.status = "cancelled";
    await referral.save();

    res.status(200).json({
      message: "Referral cancelled successfully",
      referral: {
        id: referral._id,
        referrer: referral.referrer,
        referred: referral.referred,
        status: referral.status,
      },
    });
  } catch (error) {
    console.error("Error in unreferUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReferral = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { referralId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    if (!referralId) {
      res.status(400).json({ message: "Bad Request: Referral ID is required" });
      return;
    }

    // Find the referral and check if the current user is the referrer
    const referral = await ReferralModel.findOne({
      _id: referralId,
      referrer: userId,
    });

    if (!referral) {
      res
        .status(404)
        .json({ message: "Referral not found or not authorized to delete" });
      return;
    }

    // Delete the referral
    await ReferralModel.deleteOne({ _id: referralId });

    res.status(200).json({
      message: "Referral deleted successfully",
      deletedReferral: {
        id: referral._id,
        referrer: referral.referrer,
        referred: referral.referred,
        status: referral.status,
      },
    });
  } catch (error) {
    console.error("Error in deleteReferral:", error);

    if (error instanceof MongooseError.CastError) {
      res.status(400).json({ message: "Invalid referral ID format" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
export const getAllReferralsForEmployee = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    const referrals = await ReferralModel.find({ referrer: userId })
      .populate("referred")
      .lean();

    res.status(200).json({
      message: "Referrals retrieved successfully",
      referrals: referrals,
    });
  } catch (error) {
    console.error("Error in getAllReferralsForEmployee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
