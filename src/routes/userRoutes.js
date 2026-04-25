import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUserController, updateUserProfileController, updateUserAvatar } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateUserSchema } from "../validation/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/current", authenticate, getCurrentUserController);

router.patch(
  "/profile",
  authenticate,
  validateBody(updateUserSchema),
  updateUserProfileController
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar
);

export default router;
