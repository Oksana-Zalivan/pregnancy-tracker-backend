import express from "express";
import { registerController } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/auth.js";

const router = express.Router();

router.post("/register", validateBody(registerUserSchema), registerController);

export default router;
