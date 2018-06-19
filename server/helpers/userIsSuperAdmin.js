import models from '../db/models';
import sendError from './sendError';

const { Users } = models;
/**
 * checks database to find out if user is superAdmin
 * @param {object} req request object from express/body-parser
 * @param {object} res response object from express
 * @param {function} next express next middleware function
 * @returns {object} response in json
 */
const userIsSuperAdmin = (req, res, next) =>
  (
    Users.findById(req.decoded.userId)
      .then((user) => {
        if (user.role !== 'SuperAdmin') {
          return res.status(403).send({
            error: 'You are not authorized to perform this action'
          });
        }
        next();
      })
      .catch(err => sendError(err, res, true))
  );

export default userIsSuperAdmin;
