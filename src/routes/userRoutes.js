import express from 'express';
import { celebrate } from 'celebrate';

import {
  getCurrentUserController,
  updateUserProfileController,
  updateUserAvatar,
} from '../controllers/userController.js';

import { authenticate } from '../middlewares/authenticate.js';
import { updateUserSchema } from '../validation/auth.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/current', authenticate, getCurrentUserController);

router.patch(
  '/profile',
  authenticate,
  celebrate(updateUserSchema),
  updateUserProfileController,
);

router.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
