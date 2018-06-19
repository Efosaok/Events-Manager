import models from '../db/models';
import sendError from './sendError';

const { Users } = models;
/**
 * checks database to find out if user is admin.
 * @param {object} req request object
 * @param {object} res response object from express/bodyparser
 * @param {function} next express next middleware function
 * @returns {object} response in json
 */
const userIsAdmin = (req, res, next) =>
  (
    Users.findById(req.decoded.userId)
      .then((user) => {
        if (user.role === 'User') {
          return res.status(403).send({
            error: 'You are not authorized to perform this action'
          });
        }
        next();
      })
      .catch(err => sendError(err, res, true))
  );

export default userIsAdmin;
