import express from 'express';
import {
  getEmotions,
  getEmotion,
} from '../controllers/emotionController.js';

const router = express.Router();

router.get('/', getEmotions);
router.get('/:id', getEmotion);

export default router;