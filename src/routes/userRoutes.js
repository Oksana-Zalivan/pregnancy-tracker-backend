import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUserController, updateUserProfileController } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateUserSchema } from "../validation/auth.js";

const router = express.Router();

router.get("/current", authenticate, getCurrentUserController);

router.patch(
  "/profile",
  authenticate,
  validateBody(updateUserSchema),
  updateUserProfileController
);

export default router;
