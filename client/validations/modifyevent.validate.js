import validator from 'validator';
/**
 *
 * @param {req} req object to be validated
 * @returns {any} array or boolean
 */
const checkInvalidModifyEventDetails = (req) => {
  const errorMessage = [];
  const modifiedParams = [];
  const {
    name, type, center, startDate, endDate
  } = req;
  [name, type, center, startDate, endDate].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });
  if (!startDate || !endDate) {
    errorMessage.push('Please specify both the start and end dates of the event'); // eslint-disable-line
  }
  if (name) {
    if (name.trim() === '') {
      errorMessage.push('name field cannot be empty');
    }
    if (Number.isInteger(parseFloat(name))) {
      errorMessage.push('name cannot be digits or alphanumeric characters');
    }
  }
  if (type) {
    if (type.trim() === '') {
      errorMessage.push('name field cannot be empty');
    }
    if (Number.isInteger(parseFloat(type))) {
      errorMessage.push('type fields cannot be digits or alphanumeric characters');
    }
  }
  if (startDate) {
    if (
      startDate.trim() !== '' &&
      validator.isBefore(startDate) &&
      new Date(startDate).toISOString().slice(0, 10) !==
        new Date().toISOString().slice(0, 10)
    ) {
      errorMessage.push('The commencement date chosen is past, please choose another date');
    }
    if (validator.toDate(startDate) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (endDate) {
    if (
      endDate.trim() !== '' &&
      validator.isBefore(endDate) &&
      new Date(endDate).toISOString().slice(0, 10) !==
        new Date().toISOString().slice(0, 10)
    ) {
      errorMessage.push('The end date chosen is past, please choose another date');
    }
    if (validator.toDate(endDate) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (startDate > endDate) {
    errorMessage.push('The commencement date should come before the end date');
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default checkInvalidModifyEventDetails;
