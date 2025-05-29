import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { uploadSingle, handleUploadError } from "../middlewares/upload.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  uploadProfilePicture,
  removeProfilePicture,
} from "../controllers/user.controller.js";

const router = express.Router();

// apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

// Profile picture routes
router.post("/upload-profile-picture", uploadSingle, handleUploadError, uploadProfilePicture);
router.delete("/remove-profile-picture", removeProfilePicture);

export default router;
