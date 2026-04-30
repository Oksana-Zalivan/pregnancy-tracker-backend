import express from 'express';
import { celebrate } from 'celebrate';

import {
  registerController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from '../controllers/authController.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { validateSession } from '../middlewares/validateSession.js';

const router = express.Router();

router.post('/register', celebrate(registerUserSchema), registerController);
router.post('/login', celebrate(loginUserSchema), loginUserController);
router.post('/logout', validateSession, logoutUserController);
router.post('/refresh', validateSession, refreshTokenController);

export default router;
