import validator from 'validator';
/**
 * validates email
 * @param {string} mail email to be validated
 * @returns {boolean} boolean value indicating parameter is valid or not
 */
const isValidEmail = (mail) => {
  if (/^\w+([.-]?\w+)*@\w+([ .-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

/**
 * Validates signup details
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidUserDetails = (req, res, next) => {
  const {
    firstname, lastname, email, password, confirmpassword
  } = req.body;
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
    if (req.body.password.length < 6) {
      errorMessage.push('password must be at least six characters long');
    }
  }
  if (email && !isValidEmail(email) && email.trim() !== '') {
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
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates signin details
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidUserSignIn = (req, res, next) => {
  const errorMessage = [];
  if (!req.body.email) {
    errorMessage.push('email field is required');
  }
  if (!req.body.password) {
    errorMessage.push('password field is required');
  }
  if (req.body.email) {
    if (req.body.email.trim() === '') {
      errorMessage.push('email field cannot be empty');
    }
  }
  if (req.body.password) {
    if (req.body.password.trim() === '') {
      errorMessage.push('password field cannot be empty');
    }
  }
  if (req.body.email) {
    if (req.body.email.trim() !== '' && !isValidEmail(req.body.email)) {
      errorMessage.push('Invalid email format');
    }
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates userId parameter
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidParams = (req, res, next) => {
  if (!validator.isUUID(req.params.userId, 4)) {
    return res.status(400).send({ error: 'Invalid id parsed' });
  }
  next();
};

export default {
  checkInvalidUserDetails,
  checkInvalidUserSignIn,
  checkInvalidParams
};
