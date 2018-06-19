import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import { getRentalCostAndFacilities } from '../../../actions/centerActions';
import prefillCheckBox from '../../../utils/checkboxprefill';
import AuthPages from '../../HOC/AuthPages';
import { checkInvalidRentalCostAndFacilities } from
  '../../../validations/addcenter.validate';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';

/**
 *
 *
 * @class AddCenterFormTwo
 * @extends {Component}
 */
export class AddCenterFormTwo extends Component {
/**
 * Creates an instance of AddCenterFormTwo.
 * @param {any} props
 * @memberof AddCenterFormTwo
 */
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      rentalCost: '',
    };
    this.getRentalCost = this.getRentalCost.bind(this);
    this.addFacilities = this.addFacilities.bind(this);
    this.addFacilitiesAndRentalCost = this.addFacilitiesAndRentalCost.bind(this); // eslint-disable-line
  }
  /**
 *
 *
 * @memberof AddCenterFormTwo
 * @returns {object} state if user is unauthenticated
 */
  componentWillMount() {
    if (!this.props.center.status.addedPrimaryCenterDetails) {
      browserHistory.push('/addcenterone');
    }
    if (this.props.center.rentalCostAndFacilities) {
      this.setState({ ...this.props.center.rentalCostAndFacilities });
    }
  }
  /**
 *
 *
 * @memberof AddCenterFormTwo
 * @returns {null} calls function to prefill checkbox if user
 * is returning to this page.
 */
  componentDidMount() {
    if (this.state.facilities.length > 0) {
      prefillCheckBox(this.state.facilities);
    }
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormTwo
 * @returns {string} value of field input
 */
  getRentalCost(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 * @param {any} event
 * @memberof AddCenterFormTwo
 * @returns {string} the value of facilities input chexkbox
 */
  addFacilities(event) {
    if (this.state.facilities.includes(event.target.value)) {
      this.state.facilities.splice(
        this.state.facilities.indexOf(event.target.value),
        1
      );
    } else {
      this.state.facilities.push(event.target.value);
    }
  }
  /**
 *
 *
 * @param {object} event element event object
 * @memberof AddCenterFormTwo
 * @returns {object} state after an action is called
 */
  addFacilitiesAndRentalCost(event) {
    event.preventDefault();
    const validationErrors = checkInvalidRentalCostAndFacilities(this.state);
    if (Array.isArray(validationErrors)) {
      return actionRejectedPrompter(validationErrors);
    }
    this.props.dispatch(getRentalCostAndFacilities({
      ...this.state,
    }));
    browserHistory.push('/addcenterthree');
  }
  /**
 *
 *
 * @returns {object} html document object
 * @memberof AddCenterFormTwo
 */
  render() {
    const { rentalCost } = this.state;
    return (
      <div className="add-center-form-one" style={{ marginTop: `${10}%` }}>
        <div className="container form-section">
          <div
            className="sign-in-container form-container sign-in-container"
            style={{ marginTop: `${5}%`, border: 'none' }}
          >
            <div className="form-header">
              <p
                className="text-center header-form"
                style={{ marginTop: `${3}%` }}
              >
              Select Facilities And Rentalcost
              </p>
            </div>
            <form
              className="form form-group container"
              style={{ marginTop: `${60}px` }}
            >
              <div
                className="row facilities-checklist "
                style={{ marginBottom: `${30}px` }}
              >
                <div className="col" style={{ marginBottom: '20px' }}>
                  <input
                    id="parking lot"
                    type="checkbox"
                    value="parking lot"
                    name="parkinglot"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="parkingLot"
                  >Parking-lot
                  </label>
                </div>
                <div className="col">
                  <input
                    id="projector"
                    type="checkbox"
                    value="projector"
                    name="projector"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="projector"
                  >Projector(s)
                  </label>
                </div>
                <div className="col">
                  <input
                    id="swimming-pool"
                    type="checkbox"
                    value="swimming-pool"
                    name="swimming-pool"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="swimming-pool"
                  >Swimming-pool
                  </label>
                </div>
                <div className="col">
                  <input
                    id="lounge"
                    type="checkbox"
                    value="lounge"
                    name="lounge"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="lounge"
                  >
                  Lounge
                  </label>
                </div>
                <div className="col">
                  <input
                    id="changing room"
                    type="checkbox"
                    value="changing room"
                    name="changingroom"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="changingroom"
                  >Changing-room
                  </label>
                </div>
                <div className="col">
                  <input
                    id="Barbecue section"
                    type="checkbox"
                    value="Barbecue section"
                    name="barbecuesection"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="barbecue"
                  >Parking-lot
                  </label>
                </div>
                <div className="col">
                  <input
                    id="Rest room"
                    type="checkbox"
                    value="Rest room"
                    name="restroom"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="restroom"
                  >Rest room
                  </label>
                </div>
                <div className="col">
                  <input
                    id="Photo gallery"
                    type="checkbox"
                    value="Photo gallery"
                    name="photogallery"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="photogallery"
                  >Photo gallery
                  </label>
                </div>
                <div className="col">
                  <input
                    id="Catering Area"
                    type="checkbox"
                    value="Catering Area"
                    name="catering-area"
                    style={{ height: `${25}px`, width: `${25}px` }}
                    onClick={this.addFacilities}
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="photogallery"
                  >Catering Area
                  </label>
                </div>
              </div>
              <label htmlFor="rentalcost">rental Cost</label>
              <input
                id="rentalCost"
                name="rentalCost"
                type="number"
                placeholder="Amount e.g 300000 in Naira"
                className="form-control"
                onChange={this.getRentalCost}
                defaultValue={rentalCost !== '' ? rentalCost : ''}
              />
              <br />
              <div className="row left-right-btns container">
                <div className="col">
                  <Link to="/addcenterone">
                    <button className="btn">
                      <i
                        className="fa fa-chevron-left"
                        style={{ fontSize: `${1.7}em`, color: '#F50057' }}
                      />
                    </button>
                  </Link>
                </div>
                <div className="col-xs-9 d-flex justify-content-end">
                  <button
                    className="btn"
                    onClick={this.addFacilitiesAndRentalCost}
                  >
                    <i
                      className="fa fa-chevron-right"
                      style={{ fontSize: `${1.7}em`, color: '#F50057' }}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  });

const mapStateToProps = state =>
  ({
    user: state.userReducer,
    center: state.centerReducer,
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthPages(AddCenterFormTwo));

const propTypes = {
  center: PropTypes.shape({
    rentalCostAndFacilities: PropTypes.shape({
      facilities: PropTypes.arrayOf(PropTypes.string),
      rentalCost: PropTypes.string,
    }),
    status: PropTypes.shape({
      error: PropTypes.bool,
      addedPrimaryCenterDetails: PropTypes.bool,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AddCenterFormTwo.propTypes = propTypes;
