/**
 * checks if a query along the /api/centers/ route is a search
 * @param {object} req request object
 * @returns {boolean} booolean value whether query is a search
 */
const requestIsASearch = (req) => {
  let searchQueryExists = false;
  Object.keys(req.query).forEach((key) => {
    if (
      key === 'name' ||
      key === 'type' ||
      key === 'capacity' ||
      key === 'rentalCost'
    ) {
      searchQueryExists = true;
    }
  });
  return searchQueryExists;
};

export default requestIsASearch;
