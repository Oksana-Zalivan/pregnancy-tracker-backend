import express from "express";
import {
  getPublicCurrentWeek,
  getPrivateCurrentWeek,
  getBabyByWeek,
  getMomBodyByWeek,
} from "../controllers/weekController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/public/current", getPublicCurrentWeek);
router.get("/private/current", authenticate, getPrivateCurrentWeek);
router.get("/:weekNumber/baby", authenticate, getBabyByWeek);
router.get("/:weekNumber/mom-body", authenticate, getMomBodyByWeek);

export default router;
