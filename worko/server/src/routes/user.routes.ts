import express, { Request, Response } from "express";
import { getAllUser, getUserData } from "../controllers/user.controller";
import {
  auth,
  adminAuth,
  empAuth,
  empOrAdminAuth,
} from "../middleware/auth.middleware";
import {
  deleteReferral,
  getAllReferralsForEmployee,
  referUser,
  unreferUser,
} from "../controllers/employee.controller";
import {
  getAllReferrals,
  getAllUsers,
  updateReferralStatus,
  updateUserRole,
} from "../controllers/admin.controller";

const router = express.Router();
// Admin routes
router.get("/users", auth, empOrAdminAuth, getAllUsers);
router.get("/admin/referrals", auth, adminAuth, getAllReferrals);
router.put("/admin/user-role", auth, adminAuth, updateUserRole);
router.put("/admin/referral-status", auth, adminAuth, updateReferralStatus);
router.delete("/admin/referral/:referralId", auth, adminAuth, deleteReferral);

router.post("/refer", auth, empOrAdminAuth, referUser);
router.put("/referrals/:referralId", auth, empOrAdminAuth, unreferUser);
router.delete("/referrals/:referralId", auth, empOrAdminAuth, deleteReferral);
router.get("/referrals", auth, empOrAdminAuth, getAllReferralsForEmployee);

export default router;
