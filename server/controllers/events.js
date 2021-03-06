import models from '../db/models';
import mailSender from '../helpers/mailer';
import sendError from '../helpers/sendError';

const { Events, Users } = models;

/**
* @Event, class containing all methods that
* handle centerevent
*/
class Event {
/**
 * Creates an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 */
  static addEvent(req, res) {
    const {
      name,
      type,
      startDate,
      endDate,
      center,
    } = req.body;
    return Events
      .create({
        name,
        type,
        center,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        user: req.decoded.userId,
      })
      .then(newEvent => res.status(201).send({
        message: 'Event successfully added',
        newEvent
      }))
      .catch(error => sendError(error, res, false));
  }
  /**
 * modifies an event
 * @param {object} req The request object from express/body-parser
 * @param {object} res The response body.
 * @returns {object} response in json.
 */
  static modifyEvent(req, res) {
    const { center } = req.body;
    Events.findById(req.params.eventId)
      .then((modifiedEvent) => {
        if (!modifiedEvent) {
          return res.status(404).send({ error: 'event not found' });
        }
        modifiedEvent.updateAttributes({
          name: req.body.name || modifiedEvent.name,
          type: req.body.type || modifiedEvent.type,
          startDate: new Date(req.body.startDate).toISOString() ||
          modifiedEvent.startDate,
          endDate: new Date(req.body.startDate).toISOString() ||
          modifiedEvent.endDate,
          center: center || modifiedEvent.center,
        });
        return res.status(200).send({
          message: 'successfully modified',
          modifiedEvent
        });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * delete an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 */
  static deleteEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ error: 'event not found' });
        }
        if (event && event.user !== req.decoded.userId) {
          return res.status(403).send({
            error: 'You cannot delete an event added by another user'
          });
        }
        event.destroy()
          .then(() => res.status(200).send({
            message: 'Event successfully deleted'
          }))
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * get User Events
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 */
  static getUserEvents(req, res) {
    const limit = req.query.limit || 6;
    const offset = req.query.page ?
      (parseFloat(req.query.page) - 1) * limit : 0;
    const currentPage = req.query.page ? parseFloat(req.query.page) : 1;
    Events.findAndCountAll({
      where: {
        user: req.decoded.userId,
      },
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    })
      .then((userEvents) => {
        if (userEvents.rows.length === 0) {
          return res.status(404).send({
            error: 'No events found for this User'
          });
        }
        return res.status(200).send({
          message: 'Success',
          userEvents: userEvents.rows,
          pages: Math.ceil(userEvents.count / limit),
          currentPage,
        });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * Cancels User Events
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 */
  static cancelUserEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        event.updateAttributes({
          center: null,
        });
        Users.findById(event.user)
          .then((user) => {
            const mailOptions = {
              from: 'efosaeventsmanager@evt.com',
              to: user.email,
              subject: 'Notice Of cancellation of event',
              text: ` This Is to Inform You that For some reasons,Your event
              has been canceled! \n Please log on here
              https://efosa-events-manager.herokuapp.com to
              events manager to get another venue for your event `,
            };
            return mailSender(mailOptions, res);
          })
          .catch(error => sendError(error, res, false));
      })
      .catch(error => sendError(error, res, false));
  }
}

export default Event;
