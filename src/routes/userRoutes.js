import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUserController,updateUserAvatar } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/current", authenticate, getCurrentUserController);

router.patch(
  '/current/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);
export default router;
