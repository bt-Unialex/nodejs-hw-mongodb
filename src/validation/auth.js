import JoiValidation from 'joi';

export const userValidationSchema = JoiValidation.object({
  name: JoiValidation.string().min(3).max(20).required(),
  email: JoiValidation.string().email().required(),
  password: JoiValidation.string().required(),
});
