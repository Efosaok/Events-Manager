import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../db/models';

const secret = process.env.SECRET;

const { Users } = models;

/**
* @User, class containing all methods that
* handle center related api endpoint
*/
class User {
/**
 * SignUp a User
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static signup(req, res) {
    const {
      email,
      firstname,
      lastname,
    } = req.body;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      const password = hash;
      return Users
        .create({
          firstname,
          lastname,
          email,
          password,
        })
        .then((user) => {
          const payload = {
            userId: user.id,
            isAdmin: user.isAdmin,
            firstname,
            lastname,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '10h', // expires in 1 hours
          });
          res.status(201).send({ message: 'You have successfully signed up', token });
        })
        .catch(error => res.status(400).send({ error: error.message }));
    });
  }
  /**
 * SignIn a User
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    return Users
      .findOne({
        where: {
          email,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({ error: 'Invalid email or password' });
        }
        return bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const payload = {
              userId: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              isAdmin: user.isAdmin,
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: '10h', // expires in 1 hours
            });
            return res.status(200).send({ message: 'You have successfully logged in', token });
          }
          return res.status(400).send({ error: 'Invalid Username or password' });
        });
      })
      .catch(() => res.status(500).send({ error: 'an error occurred' }));
  }
  /**
 * Make A User an Admin
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static becomeAdmin(req, res) {
    Users.findById(req.decoded.userId)
      .then((user) => {
        user.updateAttributes({
          isAdmin: true,
        });
        return res.status(202).send({ message: 'You are now an admin,Please log in again to begin using all admin features' });
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default User;
