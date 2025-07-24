import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const endpoints = Router();
endpoints.use('/auth', authRouter);
endpoints.use('/contacts', contactsRouter);

export default endpoints;
