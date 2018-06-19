import validator from 'validator';
/**
 *
 * @param {req} req object to be validated
 * @returns {any} array or boolean
 */
const signinValidator = (req) => {
  const errorMessage = [];
  if (!req.email) {
    errorMessage.push('email field is required');
  }
  if (!req.password) {
    errorMessage.push('password field is required');
  }
  if (req.email) {
    if (req.email.trim() === '') {
      errorMessage.push('email field cannot be empty');
    }
  }
  if (req.password) {
    if (req.password.trim() === '') {
      errorMessage.push('password field cannot be empty');
    }
  }
  if (req.email) {
    if (req.email.trim() !== '' && !validator.isEmail(req.email)) {
      errorMessage.push('Invalid email format');
    }
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default signinValidator;
