import express from 'express';
import {
  registerController,
  loginUserController,
  logoutUserController,
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), registerController);
router.post('/login', validateBody(loginUserSchema), loginUserController);
router.post('/logout', logoutUserController);

export default router;
