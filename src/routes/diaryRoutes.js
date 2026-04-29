import express from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getDiaries,
  createDiary,
  updateDiaryController,
  deleteDiaryController,
} from '../controllers/diaryController.js';
import { createDiarySchema } from '../validation/diary.js';

const router = express.Router();

router.get('/', authenticate, getDiaries);
router.post('/', authenticate, celebrate(createDiarySchema), createDiary);
router.patch(
  '/:id',
  authenticate,
  celebrate(createDiarySchema),
  updateDiaryController,
);
router.delete('/:id', authenticate, deleteDiaryController);

export default router;
