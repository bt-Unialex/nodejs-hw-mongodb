import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  resetAuthPasswordController,
  sendResetEmailController,
} from '../controllers/auth.js';
import {
  loginUserBodyCheck,
  registerUserBodyCheck,
  requestResetPwdBodyCheck,
  resetAuthPasswordBodyCheck,
} from '../middlewares/validationBody.js';

const authEndpoints = Router();

authEndpoints.post('/register', registerUserBodyCheck, registerUserController);
authEndpoints.post('/login', loginUserBodyCheck, loginUserController);
authEndpoints.post('/refresh', refreshUserController);
authEndpoints.post('/logout', logoutUserController);

authEndpoints.post('/send-reset-email', requestResetPwdBodyCheck, sendResetEmailController);
authEndpoints.post('/reset-pwd', resetAuthPasswordBodyCheck, resetAuthPasswordController);

export default authEndpoints;
