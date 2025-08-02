import path from 'node:path';
import { getEnvVar } from '../utils/getEnvVar.js';
import { createDirIfNotExists } from '../utils/createDirIfNotExists.js';

export const HTTP_PORT = getEnvVar('PORT', 3000);

export const SMTP = {
  SMTP_HOST: getEnvVar('SMTP_HOST'),
  SMTP_PORT: Number(getEnvVar('SMTP_PORT', 587)),
  SMTP_USER: getEnvVar('SMTP_USER'),
  SMTP_PASSWORD: getEnvVar('SMTP_PASSWORD'),
};
export const SMTP_FROM = getEnvVar('SMTP_FROM');

export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const JWT_TTL = '5m';
export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; //FIFTEEN_MINUTES
export const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000; //ONE_DAY

export const APP_DOMAIN = getEnvVar('APP_DOMAIN');

const APP_DIR = path.join(process.cwd(), 'src');
export const TEMPLATE_DIR = path.join(APP_DIR, 'templates');
export const TEMP_UPLOAD_DIR = createDirIfNotExists(path.join(APP_DIR, 'temp'));
// export const PHOTO_DIR = path.join(APP_DIR, 'uploads');
