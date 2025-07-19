
import { validateAndSanitize } from './validation';

export const validateProfileForm = (formData: any) => {
  return validateAndSanitize.profile(formData);
};
