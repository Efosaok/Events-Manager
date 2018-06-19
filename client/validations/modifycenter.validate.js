const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  }
  return false;
};
/**
 *
 * @param {req} req object to be validated
 * @returns {any} array or boolean
 */
const checkInvalidModifyCenterDetails = (req) => {
  const errorMessage = [];
  const modifiedParams = [];
  let isNull;
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
  } = req;
  [name, type, capacity, mobileNumber, address].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });
  modifiedParams.forEach((value) => {
    if (value !== undefined) {
      if (value.trim().length < 1) {
        isNull = true;
      }
    }
  });
  if (isNull) {
    errorMessage.push('fields to be modified should not be empty');
  }
  if (capacity) {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage.push('capacity field can only be digits');
    }
    if (alphaNumeric(capacity)) {
      errorMessage.push('capacity cannot be alphanumeric');
    }
  }
  if (mobileNumber) {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage.push('mobileNumber field can only be digits');
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage.push('mobileNumber cannot be alphanumeric');
    }
    if (mobileNumber.length !== 11) {
      errorMessage.push('invalid mobileNumber');
    }
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};

export default checkInvalidModifyCenterDetails;
