import validator from 'validator';
/**
 * Validates Create Event Data
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidAddEventDetails = (req, res, next) => {
  const errorMessage = [];
  const {
    name, type, center, startDate, endDate
  } = req.body;
  const eventDetails = [name, type, center, startDate, endDate];
  const matchingDetails = {
    0: 'name',
    1: 'type',
    2: 'center',
    3: 'startDate',
    4: 'endDate'
  };
  for (let counter = -1; counter < eventDetails.length - 1;) {
    counter += 1;
    if (eventDetails[counter] === undefined) {
      errorMessage.push(`${matchingDetails[counter]} is required`);
    }
    if (eventDetails[counter] !== undefined) {
      if (eventDetails[counter].trim() === '') {
        errorMessage.push(`${matchingDetails[counter]} cannot be empty`);
      }
    }
  }
  if (!startDate || !endDate) {
    errorMessage.push('Please specify the dates of the event');
  }
  if (center) {
    if (!validator.isUUID(center, 4)) {
      errorMessage
        .push('invalid center selected');
    }
  }
  if (name) {
    if (name.trim() !== '' && Number.isInteger(parseFloat(name))) {
      errorMessage
        .push('name field cannot be digits or alphanumeric characters');
    }
  }
  if (type) {
    if (type.trim() !== '' && Number.isInteger(parseFloat(type))) {
      errorMessage
        .push('type field cannot be digits or alphanumeric characters');
    }
  }
  if (startDate) {
    if (
      startDate.trim() !== '' &&
      validator.isBefore(startDate) &&
      new Date(startDate).toISOString().slice(0, 10) !==
        new Date().toISOString().slice(0, 10)
    ) {
      return res.status(406).send({
        error: 'The start date chosen is past, please choose another date'
      });
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
      return res.status(406).send({
        error: 'The end date chosen is past, please choose another date'
      });
    }
    if (validator.toDate(endDate) === null) {
      errorMessage.push('invalid date');
    }
  }
  if (startDate > endDate) {
    errorMessage.push('The commencement date should come before the end date');
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates modify event data
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidModifyEventDetails = (req, res, next) => {
  const errorMessage = [];
  const modifiedParams = [];
  const {
    name, type, center, startDate, endDate
  } = req.body;
  [name, type, center, startDate, endDate].forEach((input) => {
    if (input) {
      modifiedParams.push(input);
    }
  });
  if (!startDate || !endDate) {
    errorMessage.push('Please specify the dates of the event');
  }
  if (center) {
    if (!validator.isUUID(center, 4)) {
      errorMessage.push('invalid center selected');
    }
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
      errorMessage
        .push('type fields cannot be digits or alphanumeric characters');
    }
  }
  if (startDate) {
    if (
      startDate.trim() !== '' &&
      validator.isBefore(startDate) &&
      new Date(startDate).toISOString().slice(0, 10) !==
        new Date().toISOString().slice(0, 10)
    ) {
      return res.status(406).send({
        error: 'The start date chosen is past, please choose another date'
      });
    }
    if (validator.toDate(startDate) === null) {
      errorMessage.push('invalid start date');
    }
  }
  if (endDate) {
    if (
      endDate.trim() !== '' &&
      validator.isBefore(endDate) &&
      new Date(endDate).toISOString().slice(0, 10) !==
        new Date().toISOString().slice(0, 10)
    ) {
      return res.status(406).send({
        error: 'The end date chosen is past, please choose another date'
      });
    }
    if (validator.toDate(startDate) === null) {
      errorMessage.push('invalid end date');
    }
  }
  if (startDate > endDate) {
    errorMessage.push('The commencement date should come before the end date');
  }
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

/**
 * Validates eventId parameter
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const checkInvalidEventParams = (req, res, next) => {
  if (!validator.isUUID(req.params.eventId, 4)) {
    return res.status(400).send({ error: 'Invalid id supplied' });
  }
  next();
};

export {
  checkInvalidAddEventDetails,
  checkInvalidModifyEventDetails,
  checkInvalidEventParams
};
