import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/sessionsModel.js';
import { usersCollection } from '../db/usersModel.js';

export const authenticate = async (request, response, next) => {
  const authHeader = request.get('Authorization');

  if (typeof authHeader !== 'string') throw createHttpError(401, 'Please provide Authorization header');

  const [bearer, token] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !token) throw createHttpError(401, 'Auth header should be of type Bearer');

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) throw createHttpError(401, 'Session not found');

  if (session.accessTokenValidUntil < Date.now()) throw createHttpError(401, 'Access token expired');

  const user = await usersCollection.findById(session.userId);

  if (!user) throw createHttpError(401, 'User not found');

  request.user = user;
  next();
};
