import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { modifyEvent, promptModify } from '../../../actions/eventActions';
import { getAllCenters } from '../../../actions/centerActions';
import CenterList from '../presentational/CenterList';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';
import { LoadingIcon, LargeLoadingIcon } from '../../utils/LoaderComponents';
import { prefillVenue } from '../../../utils/mescill.utils';
import isValidModificationDetails
  from '../../../validations/modifyevent.validate';
import ModifyEventWrapper from '../../HOC/ModifyEventWrapper';

/**
 *
 *
 * @class ModifyEventPage
 * @extends {Component}
 */
export class ModifyEventPage extends Component {
  /**
   * Creates an instance of AddEventPage.
   * @param {any} props
   * @memberof ModifyEventPage
   */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      center: undefined,
      startDate: this.props.event.eventObject[0].startDate.slice(0, 10),
      endDate: this.props.event.eventObject[0].startDate.slice(0, 10)
    };

    this.getEventDetails = this.getEventDetails.bind(this);
    this.modifyEvent = this.modifyEvent.bind(this);
  }
  /**
   *
   *
   * @memberof ModifyEventPage
   * @returns {object} new state after object dispatched
   */
  componentDidMount() {
    if (localStorage.getItem('eventObject')) {
      this.props.promptModify(this.props.event.eventObject[0].id);
    }
    this.props.getAllCenters({ limit: 100 });
  }
  /**
   *
   *
   * @param {nextProps} nextProps most recent props received from redux store;
   * @memberof ModifyEventPage
   * @returns {function} browserhistory redirect function
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.event.status.eventIsModified) {
      browserHistory.push('/');
    }
  }
  /**
   *
   *
   * @memberof ModifyEventPage
   * @returns {null} removes redundant items from localStorage
   */
  componentWillUnmount() {
    localStorage.removeItem('eventObject');
    localStorage.removeItem('allUserEvents');
  }
  /**
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyEventPage
 * @returns {string} value of input element
 */
  getEventDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyEventPage
   * @returns {object} state of app after addingEvent
   */
  modifyEvent(event) {
    event.preventDefault();
    const validationErrors = isValidModificationDetails(this.state);
    if (Array.isArray(validationErrors)) {
      return this.props.actionRejectedPrompter(validationErrors);
    }
    this.props.modifyEvent(
      {
        ...this.state
      },
      this.props.event.eventObject[0].id
    );
  }
  /**
   *
   *
   * @returns {object} dicument obbject model for browser rendering
   * @memberof ModifyEventPage
   */
  render() {
    const { startDate, endDate, center } = this.props.event.eventObject[0];
    return (
      <div className="modify-event-form">
        {this.props.center.status.fetchingCenters ? (
          <div className="text-center">
            <LargeLoadingIcon />
          </div>
        ) : (
          <div className="container form-section">
            <div
              className="form-container container"
              style={{ height: `${640}px`, border: 'none' }}
            >
              <div className="form-header">
                <p
                  className="text-center header-form"
                  style={{ fontSize: `${1.5}em` }}
                >
                  Modify Event
                </p>
              </div>
              <form className="form form-group">
                <label htmlFor="name-of-event">Name of event</label>
                <input
                  onChange={this.getEventDetails}
                  type="text"
                  name="name"
                  placeholder="Name of Event"
                  className="form-control first-name name"
                  defaultValue={this.props.event.eventObject[0].name}
                />
                <label htmlFor="type-of-event">Type of event</label>
                <select
                  className="form-control"
                  name="type"
                  onChange={this.getEventDetails}
                  defaultValue={this.props.event.eventObject[0].type}
                >
                  <option>select option</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Club">Club</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Conference">Conference</option>
                  <option value="Coporate">Coporate</option>
                  <option value="Party">Party</option>
                </select>
                <label htmlFor="date">start date</label>
                <div className="year">
                  <input
                    type="date"
                    id="startdate"
                    name="startDate"
                    className="form-control"
                    onChange={this.getEventDetails}
                    defaultValue={startDate.slice(0, 10)}
                  />
                </div>
                <label htmlFor="date">end date</label>
                <div className="year">
                  <input
                    type="date"
                    id="enddate"
                    name="endDate"
                    className="form-control"
                    onChange={this.getEventDetails}
                    defaultValue={endDate.slice(0, 10)}
                  />
                </div>
                <label htmlFor="preferred-center">Preferred center</label>
                <select
                  className="form-control"
                  onChange={this.getEventDetails}
                  name="center"
                  defaultValue={prefillVenue(
                    center,
                    this.props.center.allCenters.centers
                  )}
                >
                  <option>select option</option>
                  {this.props.center.allCenters.centers.map(aCenter => (
                    <CenterList center={aCenter} key={aCenter.id} />
                  ))}
                </select>
                <br />
                <div className="text-center">
                  <button
                    className="btn btn-modify btn-submit booked"
                    onClick={this.modifyEvent}
                  >
                    Modify Event
                  </button>
                  {this.props.event.status.modifyingEvent && (
                    <div
                      className="animated fadeIn"
                      style={{ marginTop: '-70px' }}
                    >
                      <LoadingIcon />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.eventReducer,
  center: state.centerReducer,
  user: state.userReducer
});

export default connect(
  mapStateToProps,
  {
    getAllCenters,
    modifyEvent,
    actionRejectedPrompter,
    promptModify,
  }
)(ModifyEventWrapper(ModifyEventPage));

const propTypes = {
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
        capacity: PropTypes.string,
        mobileNumber: PropTypes.string,
        type: PropTypes.string,
        rentalCost: PropTypes.string,
        imageUrl: PropTypes.string
      }))
    }),
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
  event: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  }).isRequired,
  getAllCenters: PropTypes.func.isRequired,
  modifyEvent: PropTypes.func.isRequired,
  actionRejectedPrompter: PropTypes.func.isRequired,
  promptModify: PropTypes.func.isRequired,
};

ModifyEventPage.propTypes = propTypes;
