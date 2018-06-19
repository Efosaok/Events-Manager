import validator from 'validator';
/**
 *
 * @param {req} req object to be validated
 * @returns {any} array or boolean
 */
const signupValidator = (req) => {
  const {
    firstname, lastname, email, password, confirmpassword
  } = req;
  const matchingDetails = {
    0: 'firstname',
    1: 'lastname',
    2: 'email',
    3: 'password',
    4: 'confirmpassword'
  };
  const reqBody = [firstname, lastname, email, password, confirmpassword];
  const errorMessage = [];
  let isDigit = false;
  for (let i = 0; i < reqBody.length; i += 1) {
    if (reqBody[i] !== undefined) {
      if (reqBody[i].trim() === '') {
        errorMessage.push(`${matchingDetails[i]} field cannot be empty`);
      }
    }
    if (reqBody[i] === undefined) {
      errorMessage.push(`${matchingDetails[i]} field is required`);
    }
  }

  [firstname, lastname].forEach((field) => {
    if ((firstname || lastname) && Number.isInteger(parseFloat(field))) {
      isDigit = true;
    }
  });
  if (password && password.trim() !== '') {
    if (password.length < 6) {
      errorMessage.push('password must be at least six characters long');
    }
  }
  if (email && !validator.isEmail(email) && email.trim() !== '') {
    errorMessage.push('Invalid email format');
  }
  if (isDigit) {
    errorMessage.push('Your name cannot be numbers');
  }
  if (
    password &&
    confirmpassword &&
    password !== confirmpassword &&
    password.trim() !== '' &&
    confirmpassword.trim() !== ''
  ) {
    errorMessage.push('password and confirmpassword are not equal');
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default signupValidator;
