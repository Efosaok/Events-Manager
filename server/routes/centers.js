import centerControllers from '../controllers/center';
import verifyToken from '../middlewares/verifyToken';
import validateQuery from '../middlewares/validateQuery';
import {
  checkInvalidCenterParams,
  checkInvalidAddCenterDetails,
  checkInvalidModifyCenterDetails
} from '../middlewares/center';
import userIsAdmin from '../helpers/userIsAdmin';

export default (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the events-manager Api' });
  });
  app.post(
    '/api/v1/centers',
    verifyToken,
    checkInvalidAddCenterDetails,
    userIsAdmin,
    centerControllers.addCenter
  );
  app.put(
    '/api/v1/centers/:centerId',
    verifyToken,
    checkInvalidCenterParams,
    checkInvalidModifyCenterDetails,
    userIsAdmin,
    centerControllers.modifyCenter
  );
  app.get('/api/v1/centers', validateQuery, centerControllers.getAllCenters);
  app.get(
    '/api/v1/centers/:centerId',
    checkInvalidCenterParams,
    centerControllers.getACenter
  );
};
