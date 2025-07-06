export const ctrlWrapper = (controler) => {
  return async (request, response, next) => {
    try {
      await controler(request, response);
    } catch (error) {
      next(error);
    }
  };
};
