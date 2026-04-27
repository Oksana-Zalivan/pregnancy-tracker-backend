import express from "express";
import {
  getBabyByWeek,
  getMomBodyByWeek,
  getPublicCurrentWeek
} from "../controllers/weekController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/public/current", getPublicCurrentWeek);

router.get("/:weekNumber/baby", authenticate, getBabyByWeek);
router.get("/:weekNumber/mom-body", authenticate, getMomBodyByWeek);

export default router;
