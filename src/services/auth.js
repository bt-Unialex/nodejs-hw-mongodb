import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { usersCollection } from '../db/usersModel.js';
import { SessionsCollection } from '../db/sessionsModel.js';

export const registerUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email already in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await usersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
  return newUser;
};

export const loginUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Login or password is incorrect');

  const isPasswordsMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordsMatch) throw createHttpError(401, 'Login or password is incorrect');

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSession(user._id);
  return newSession;
};

export const refreshUserSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');
  if (session.refreshToken !== refreshToken) throw createHttpError(401, 'Refresh token is invalid');
  if (session.refreshTokenValidUntil < Date.now()) throw createHttpError(401, 'Session token expired');

  await SessionsCollection.deleteOne({ _id: session._id });

  const newSession = createSession(session.userId);
  return newSession;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = async (userId) => {
  const accessTokenTTL = 15 * 60 * 1000; //FIFTEEN_MINUTES
  const refreshTokenTTL = 24 * 60 * 60 * 1000; //ONE_DAY

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + accessTokenTTL),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenTTL),
  });
};
