import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../db/models';

const secret = process.env.SECRET;

const { Users } = models;

class User {
  static signup(req, res) {
    const {
      email,
      firstname,
      lastname,
    } = req.body;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ error: 'an error occurred' });
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
        bcrypt.compare(password, user.password, (err, response) => {
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
      .catch(error => res.status(500).send({ error: 'an error occurred' }));
  }
}

export default User;
