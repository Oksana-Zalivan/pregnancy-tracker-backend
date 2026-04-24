import express from "express";
import {
  getBabyByWeek,
  getMomBodyByWeek,
} from "../controllers/weekController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Weeks endpoint works" });
});

router.get("/:weekNumber/baby", authenticate, getBabyByWeek);
router.get("/:weekNumber/mom-body", authenticate, getMomBodyByWeek);

export default router;
