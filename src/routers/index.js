import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import { swaggerDocs } from '../middlewares/swaggerDocs .js';

const endpoints = Router();
endpoints.use('/api-docs', swaggerDocs());
endpoints.use('/auth', authRouter);
endpoints.use('/contacts', contactsRouter);
// endpoints.use('/uploads', express.static(PHOTO_DIR)); //for static(local) assets

export default endpoints;
