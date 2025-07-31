import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';

const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
};

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT, 587)),
  auth: { user: getEnvVar(SMTP.SMTP_USER), pass: getEnvVar(SMTP.SMTP_PASSWORD) },
});

export const sendMail = async (options) => {
  // const result = await transporter.sendMail(options);
  // return result;
  return await transporter.sendMail(options);
};
