import eventController from '../controllers/events';
import verifyToken from '../middlewares/verifyToken';
import centerIsAvailable from '../helpers/centerIsAvailable';
import {
  checkInvalidEventParams,
  checkInvalidAddEventDetails,
  checkInvalidModifyEventDetails
} from '../middlewares/events';
import userIsAdmin from '../helpers/userIsAdmin';

export default (app) => {
  app.post(
    '/api/v1/events/',
    verifyToken,
    checkInvalidAddEventDetails,
    centerIsAvailable,
    eventController.addEvent
  );
  app.put(
    '/api/v1/events/:eventId',
    verifyToken,
    checkInvalidEventParams,
    checkInvalidModifyEventDetails,
    centerIsAvailable,
    eventController.modifyEvent
  );
  app.delete(
    '/api/v1/events/:eventId',
    verifyToken,
    checkInvalidEventParams,
    eventController.deleteEvent
  );
  app.get('/api/v1/events/user', verifyToken, eventController.getUserEvents);
  app.post(
    '/api/v1/events/:eventId',
    verifyToken,
    checkInvalidEventParams,
    userIsAdmin,
    eventController.cancelUserEvent
  );
};
