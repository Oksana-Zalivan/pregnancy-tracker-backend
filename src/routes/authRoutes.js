import express from 'express';
import { celebrate } from 'celebrate';

import {
  registerController,
  loginUserController,
  logoutUserController,
} from '../controllers/authController.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

const router = express.Router();

router.post('/register', celebrate(registerUserSchema), registerController);
router.post('/login', celebrate(loginUserSchema), loginUserController);
router.post('/logout', logoutUserController);

export default router;
