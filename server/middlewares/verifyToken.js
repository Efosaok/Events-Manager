import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;
/**
 * Authentication middleware
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response object in json
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.auth || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          error: 'There seem to be an error,please login again to continue'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).send({ error: 'You have to login First' });
  }
};

export default verifyToken;
