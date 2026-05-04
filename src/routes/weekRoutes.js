import express from 'express';
import { celebrate } from 'celebrate';
import {
  getPublicCurrentWeek,
  getPrivateCurrentWeek,
  getBabyByWeek,
  getMomBodyByWeek,
} from '../controllers/weekController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { weekNumberSchema } from '../validation/week.js';

const router = express.Router();

router.get('/public/current', getPublicCurrentWeek);
router.get('/private/current', authenticate, getPrivateCurrentWeek);
router.get(
  '/:weekNumber/baby',
  authenticate,
  celebrate(weekNumberSchema),
  getBabyByWeek,
);
router.get(
  '/:weekNumber/mom-body',
  authenticate,
  celebrate(weekNumberSchema),
  getMomBodyByWeek,
);

export default router;
