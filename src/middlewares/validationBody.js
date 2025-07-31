import createHttpError from 'http-errors';
import { bodyValidationSchema } from '../validation/contacts.js';
import { requestResetPwdEmailSchema, resetAuthPasswordSchema, userValidationSchema } from '../validation/auth.js';

export const validationBody = (schema) => async (request, response, next) => {
  try {
    await schema.validateAsync(request.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationError = createHttpError(400, 'Bad request', { errors: error.details });
    next(validationError);
  }
};

export const registerUserBodyCheck = validationBody(userValidationSchema);
export const loginUserBodyCheck = validationBody(userValidationSchema.fork(['name'], (field) => field.optional()));

export const requestResetPwdBodyCheck = validationBody(requestResetPwdEmailSchema);
export const resetAuthPasswordBodyCheck = validationBody(resetAuthPasswordSchema);

export const updateContactBodyCheck = validationBody(bodyValidationSchema);
export const createContactBodyCheck = validationBody(
  bodyValidationSchema.fork(['name', 'phoneNumber'], (field) => field.required())
);
