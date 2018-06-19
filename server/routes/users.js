import userController from '../controllers/users';
import errorChecker from '../middlewares/users';
import verifyToken from '../middlewares/verifyToken';
import userIsSuperAdmin from '../helpers/userIsSuperAdmin';

export default (app) => {
  app.post(
    '/api/v1/users',
    errorChecker.checkInvalidUserDetails,
    userController.signup
  );
  app.post(
    '/api/v1/users/signin',
    errorChecker.checkInvalidUserSignIn,
    userController.signin
  );
  app.put(
    '/api/v1/users/:userId',
    verifyToken,
    errorChecker.checkInvalidParams,
    userIsSuperAdmin,
    userController.upgradeUserToAdmin
  );
  app.get('/api/v1/users', verifyToken, userIsSuperAdmin, userController.getAllUsers);
};
