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
const checkInvalidPrimaryCenterDetails = (req) => {
  const errorMessage = [];
  const {
    name,
    type,
    capacity,
    mobileNumber,
    address,
  } = req;
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'capacity',
    3: 'mobileNumber',
    4: 'address',
  };
  const centerDetails = [name, type, capacity, mobileNumber, address];
  for (let counter = -1; counter < centerDetails.length - 1;) {
    counter += 1;
    if (centerDetails[counter] === undefined) {
      errorMessage.push(`${matchingDetails[counter]} is required`);
    }
    if (centerDetails[counter] !== undefined) {
      if (centerDetails[counter].trim() === '') {
        errorMessage.push(`${matchingDetails[counter]} cannot be empty`);
      }
    }
  }
  if (capacity && capacity.trim() !== '') {
    if (!Number.isInteger(parseFloat(capacity))) {
      errorMessage.push('capacity field can only be digits');
    }
    if (alphaNumeric(capacity)) {
      errorMessage.push('capacity cannot contain numbers and letters');
    }
  }
  if (mobileNumber && mobileNumber.trim() !== '') {
    if (!Number.isInteger(parseFloat(mobileNumber))) {
      errorMessage.push('mobileNumber field can only be digits');
    }
    if (alphaNumeric(mobileNumber)) {
      errorMessage.push('mobileNumber cannot contain numbers and letters');
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
/**
 *
 * @param {req} req object to be validated
 * @returns {any} array or boolean
 */
const checkInvalidRentalCostAndFacilities = (req) => {
  const errorMessage = [];
  const { facilities, rentalCost } = req;
  if (rentalCost === undefined) {
    errorMessage.push('rental cost is required');
  }
  if (rentalCost !== undefined) {
    if (rentalCost.trim() === '') {
      errorMessage.push('rental cost cannot be empty');
    }
  }
  if (!facilities || facilities.length === 0) {
    errorMessage.push('Please specify facilities');
  }
  if (rentalCost && rentalCost.trim() !== '') {
    if (!Number.isInteger(parseFloat(rentalCost))) {
      errorMessage.push('rental cost field can only be digits');
    }
    if (alphaNumeric(rentalCost)) {
      errorMessage.push('rental cost cannot contain numbers and letters');
    }
  }
  if (errorMessage.length !== 0) {
    return errorMessage;
  }
  return true;
};
export {
  checkInvalidPrimaryCenterDetails,
  checkInvalidRentalCostAndFacilities,
};
