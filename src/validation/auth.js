import JoiValidation from 'joi';

export const userValidationSchema = JoiValidation.object({
  name: JoiValidation.string().min(3).max(20).required(),
  email: JoiValidation.string().email().required(),
  password: JoiValidation.string().required(),
});

export const requestResetPwdEmailSchema = JoiValidation.object({
  email: JoiValidation.string().email().required(),
});

export const resetAuthPasswordSchema = JoiValidation.object({
  password: JoiValidation.string().required(),
  token: JoiValidation.string().required(),
});
