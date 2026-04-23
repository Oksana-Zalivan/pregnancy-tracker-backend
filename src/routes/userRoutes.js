import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getCurrentUserController } from "../controllers/userController.js";

const router = express.Router();

router.get("/current", authenticate, getCurrentUserController);

export default router;
