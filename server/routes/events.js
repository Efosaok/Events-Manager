import eventController from '../controllers/events';
import auth from '../middlewares/auth';
import centerIsAvailable from '../helpers/centerIsAvailable';
import {
  checkInvalidEventParams,
  checkInvalidAddEventDetails,
  checkInvalidModifyEventDetails,
} from '../middlewares/events';
import userIsAdmin from '../helpers/userIsAdmin';

export default (app) => {
  app.post('/api/v1/events/', auth, checkInvalidAddEventDetails, centerIsAvailable, eventController.addEvent);
  app.put('/api/v1/events/:eventId', auth, checkInvalidEventParams, checkInvalidModifyEventDetails, centerIsAvailable, eventController.modifyEvent);
  app.delete('/api/v1/events/:eventId', auth, checkInvalidEventParams, eventController.deleteEvent);
  app.get('/api/v1/events/user', auth, eventController.getUserEvents);
  app.post('/api/v1/events/:eventId', auth, checkInvalidEventParams, userIsAdmin, eventController.cancelUserEvent);
};
