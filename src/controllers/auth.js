import { loginUser, logoutUser, refreshUserSession, registerUser } from '../services/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const registerUserController = ctrlWrapper(async (request, response) => {
  const newUser = await registerUser(request.body);

  response.status(201).json({ status: 201, message: 'Successfully created a user!', data: newUser });
});

export const loginUserController = ctrlWrapper(async (request, response) => {
  const session = await loginUser(request.body);

  setupSession(response, session);

  response.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
});

export const refreshUserController = ctrlWrapper(async (request, response) => {
  const { sessionId, refreshToken } = request.cookies;
  const session = await refreshUserSession({ sessionId, refreshToken });

  setupSession(response, session);

  response.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
});

export const logoutUserController = ctrlWrapper(async (request, response) => {
  if (request.cookies.sessionId) {
    await logoutUser(request.cookies.sessionId);
  }
  response.clearCookie('sessionId');
  response.clearCookie('refreshToken');

  response.status(204).end();
});

const setupSession = (response, session) => {
  response.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  response.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};
