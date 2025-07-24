import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserBodyCheck, registerUserBodyCheck } from '../middlewares/validationBody.js';

const authEndpoints = Router();

authEndpoints.post('/register', registerUserBodyCheck, registerUserController);
authEndpoints.post('/login', loginUserBodyCheck, loginUserController);
authEndpoints.post('/refresh', refreshUserController);
authEndpoints.post('/logout', logoutUserController);

export default authEndpoints;
