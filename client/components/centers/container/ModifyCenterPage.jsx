import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import prefillCheckbox from '../../../utils/checkboxprefill';
import { UploadProgressBar, LoadingIcon } from '../../utils/LoaderComponents';
import isValidModifyCenterDetails
  from '../../../validations/modifycenter.validate';
import {
  actionRejectedPrompter,
  actionRejectedPrompterTimer
} from '../../../utils/alerts.sweetalert';
import ModifyCenterWrapper from '../../HOC/ModifyCenterWrapper';

import {
  imageChangePrompt,
  pauseUpload,
  uploadImageAndGetUrl,
  cancelUpload,
  resumeUpload,
  modifyCenter
} from '../../../actions/centerActions';
import defaultImage from '../../../public/images/default-placeholder.png';

/** Class representing a centerpage. */
export class ModifyCenterPage extends Component {
  /**
   * Initiate Props
   * @param {number} props - The x value.
   */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      capacity: undefined,
      rentalCost: undefined,
      facilities: this.props.center.centerToBeModified[0].facilities,
      address: undefined,
      mobileNumber: undefined,
      imageFile: ''
    };
    this.promptImageChange = this.promptImageChange.bind(this);
    this.getCenterDetails = this.getCenterDetails.bind(this);
    this.getImageFile = this.getImageFile.bind(this);
    this.addFacilities = this.addFacilities.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.cancelImageUpload = this.cancelImageUpload.bind(this);
    this.resumeImageUpload = this.resumeImageUpload.bind(this);
    this.pauseImageUpload = this.pauseImageUpload.bind(this);
    this.modifyCenter = this.modifyCenter.bind(this);
  }

  /**
   *
   *
   * @memberof ModifyCenterPage
   * @returns {null} preselects checkboxes
   */
  componentDidMount() {
    prefillCheckbox(this.props.center.centerToBeModified[0].facilities);
  }
  /**
   *
   *
   * @param {any} nextProps recent props received from redux store
   * @memberof ModifyCenterPage
   * @returns {function} browserHistory push method
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.center.status.modified) {
      browserHistory.push('/centers');
    }
  }
  /**
   *
   *
   * @memberof ModifyCenterPage
   * @returns {null}
   * removes redundant items from localStorage
   */
  componentWillUnmount() {
    localStorage.removeItem('centerToBeModified');
    localStorage.removeItem('allCenters');
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {object} updates this.state from user input
   */
  getCenterDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *s
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {array} filelist of images
   */
  getImageFile(event) {
    this.setState({ [event.target.name]: event.target.files });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {array} modify facilities array based on input
   */
  addFacilities(event) {
    if (this.props.center.centerToBeModified[0].facilities === null) {
      this.state.facilities = [];
    }
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
   * @memberof ModifyCenterPage
   * @returns {object} statw change after action dispatched
   */
  promptImageChange() {
    this.props.imageChangePrompt();
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {object} object of uploadImage response from firebase
   *
   */
  uploadImage(event) {
    event.preventDefault();
    const errorMessage = 'Please choose a file before attempting to upload';
    if (!this.state.imageFile) {
      return actionRejectedPrompterTimer(errorMessage);
    }
    this.props.uploadImageAndGetUrl({
      ...this.state
    });
  }
  /**
   *
   *
   * @memberof ModifyCenterPage
   * @returns {object} snapshot of upload task after paused
   */
  pauseImageUpload() {
    this.props.pauseUpload({
      ...this.props.center.imageUpload
    });
  }
  /**
   *
   *
   * @memberof ModifyCenterPage
   * @returns {object} snapshot of upload task after imageupload resumed
   */
  resumeImageUpload() {
    this.props.resumeUpload({
      ...this.props.center.imageUpload
    });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {object} after action is dispatched,
   */
  cancelImageUpload(event) {
    event.preventDefault();
    this.props.cancelUpload({
      ...this.props.center.imageUpload
    });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ModifyCenterPage
   * @returns {object} state of app after action is dispatched
   */
  modifyCenter(event) {
    event.preventDefault();
    let imageLink;
    if (this.props.center.imageUpload) {
      imageLink = this.props.center.imageUpload.imageUrl;
    } else {
      imageLink = null;
    }
    const validationErrors = isValidModifyCenterDetails(this.state);
    if (Array.isArray(validationErrors)) {
      return actionRejectedPrompter(validationErrors);
    }
    this.props.modifyCenter(
      { ...this.state, imageUrl: imageLink },
      this.props.center.centerToBeModified[0].id
    );
  }
  /**
   *
   *
   * @returns {object} htm dom object
   * @memberof ModifyCenterPage
   */
  render() {
    const { imageUrl } = this.props.center.centerToBeModified[0];
    return (
      <div>
        <div className="container modify-center">
          <div
            style={{ border: 'none', backgroundColor: 'white' }}
            className="modify-container"
          >
            <div className="form-header">
              <h3
                className="text-center"
                style={{
                  color: '#BDBDBD',
                  marginBottom: '20px',
                  marginTop: '20px'
                }}
              >
                Edit {this.props.center.centerToBeModified[0].name}
              </h3>
            </div>
            <div className="row">
              <div className="center-image-section col-lg-4 container">
                {(!this.props.center.status.uploadingImage ||
                  !this.props.center.status.uploadImagePaused) && (
                  <img
                    className="center-image img-fluid rounded img-center"
                    alt="center"
                    id="centerimage"
                    src={imageUrl !== null ? imageUrl : defaultImage}
                    style={{ height: '300px' }}
                  />
                )}
                {(this.props.center.status.uploadingImage ||
                  this.props.center.status.uploadImagePaused) && (
                  <div className="uploadbar-m">
                    <UploadProgressBar
                      ariaValuenow={
                        this.props.center.imageUpload.uploadProgress
                      }
                    />
                  </div>
                )}
                <div className="upload-options-section-m row">
                  {this.props.center.status.uploadingImage && (
                    <div className="col">
                      <div
                        className="fa fa-pause animated fadeIn"
                        onClick={this.pauseImageUpload}
                        role="button"
                        tabIndex={0}
                        onKeyDown={this.handleKeyDown}
                      />
                    </div>
                  )}
                  {this.props.center.status.uploadImagePaused && (
                    <div className="col animated fadeIn">
                      <div
                        className="fa fa-play"
                        onClick={this.resumeImageUpload}
                        role="button"
                        tabIndex={0}
                        onKeyDown={this.handleKeyDown}
                      />
                    </div>
                  )}
                  {this.props.center.status.uploadingImage && (
                    <div className="col">
                      <button
                        className="cancel-btn btn"
                        onClick={this.cancelImageUpload}
                      >
                        cancel
                      </button>
                    </div>
                  )}
                </div>
                {!this.props.center.status.changeImagePrompted && (
                  <div className="text-center" style={{ marginTop: '10px' }}>
                    <button
                      className="btn btn-outline text-center add-image-m-btn"
                      onClick={this.promptImageChange}
                    >
                      CHANGE IMAGE
                    </button>
                  </div>
                )}
                {this.props.center.status.changeImagePrompted &&
                  !this.props.center.status.uploadingImage && (
                    <div
                      className="change-image-section container text-center"
                      style={{ marginTop: '5px' }}
                    >
                      <form className="form from-group form-inline">
                        <input
                          type="file"
                          placeholder="select file"
                          style={{ width: '150px' }}
                          onChange={this.getImageFile}
                          name="imageFile"
                          className="imageFile"
                        />
                        {this.state.imageFile !== '' && (
                          <button
                            className="btn btn-default upload-btn-m"
                            onClick={this.uploadImage}
                          >
                            upload
                          </button>
                        )}
                      </form>
                    </div>
                  )}
              </div>
              <div className="edit-form col-lg-8" style={{ marginTop: '5px' }}>
                <form className="form form-group container edit-label">
                  <label htmlFor="name">Name</label>
                  <input
                    defaultValue={this.props.center.centerToBeModified[0].name}
                    onChange={this.getCenterDetails}
                    type="text"
                    name="name"
                    placeholder="Name of Event"
                    className="form-control first-name name"
                  />
                  <label htmlFor="type">Type</label>
                  <select
                    className="form-control"
                    name="type"
                    onChange={this.getCenterDetails}
                    defaultValue={this.props.center.centerToBeModified[0].type}
                  >
                    <option value="">select type</option>
                    <option value="Club">Club</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Wedding hall">Wedding Hall</option>
                    <option value="Conference">Conference</option>
                    <option value="Coporate">Coporate</option>
                    <option value="Party">Party</option>
                    <option value="Multipurpose Hall">Multipurpose hall</option>
                  </select>
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.getCenterDetails}
                    name="capacity"
                    placeholder="capacity in numbers e.g 1000000"
                    defaultValue={
                      this.props.center.centerToBeModified[0].capacity
                    }
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    onChange={this.getCenterDetails}
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="form-control first-name address"
                    defaultValue={
                      this.props.center.centerToBeModified[0].address
                    }
                  />
                  <label htmlFor="mobile Number">Contact mobileNumber</label>
                  <input
                    onChange={this.getCenterDetails}
                    type="number"
                    name="mobileNumber"
                    placeholder="mobileNumber"
                    className="form-control first-name mobileNumber"
                    maxLength="11"
                    defaultValue={
                      this.props.center.centerToBeModified[0].mobileNumber
                    }
                  />
                  <label htmlFor="rentalcost">rental Cost</label>
                  <input
                    name="rentalCost"
                    type="number"
                    placeholder="Amount e.g 300000 in Naira"
                    className="form-control"
                    onChange={this.getCenterDetails}
                    defaultValue={
                      this.props.center.centerToBeModified[0].rentalCost
                    }
                  />
                  <h3
                    className="text-center facilities-header"
                    style={{ marginTop: '10px' }}
                  >
                    FACILITIES
                  </h3>
                  <div
                    className="row facilities-checklist "
                    style={{ marginBottom: `${30}px` }}
                  >
                    <div className="col">
                      <input
                        type="checkbox"
                        value="parking lot"
                        id="parking lot"
                        name="parkinglot"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label style={{ display: 'block' }} htmlFor="parking-ot">
                        Parking-lot
                      </label>
                    </div>
                    <div className="col">
                      <input
                        className="projector"
                        type="checkbox"
                        value="projector"
                        id="projector"
                        name="projector"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label style={{ display: 'block' }} htmlFor="projectors">
                        Projector(s)
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="swimming-pool"
                        id="swimming-pool"
                        name="swimming-pool"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label
                        style={{ display: 'block' }}
                        htmlFor="swimming-pool"
                      >
                        Swimming-pool
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="lounge"
                        id="lounge"
                        name="lounge"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label style={{ display: 'block' }} htmlFor="lounge">
                        Lounge
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="changing room"
                        id="changing room"
                        name="changingroom"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label
                        style={{ display: 'block' }}
                        htmlFor="changing-room"
                      >
                        Changing-room
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="Barbecue section"
                        id="Barbecue section"
                        name="barbecuesection"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label style={{ display: 'block' }} htmlFor="parking-ot">
                        Parking-lot
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="Rest room"
                        id="Rest room"
                        name="restroom"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label style={{ display: 'block' }} htmlFor="rest-room">
                        Rest room
                      </label>
                    </div>
                    <div className="col">
                      <input
                        type="checkbox"
                        value="Photo gallery"
                        id="Photo gallery"
                        name="photogallery"
                        style={{ height: `${25}px`, width: `${25}px` }}
                        onClick={this.addFacilities}
                      />
                      <label
                        style={{ display: 'block' }}
                        htmlFor="photo-gallery"
                      >
                        Photo gallery
                      </label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-default btn-save-m"
                      onClick={this.modifyCenter}
                    >
                      SAVE
                    </button>
                    {this.props.center.status.modifying && (
                      <div
                        className="loadingSection"
                        style={{ marginLeft: '-10px' }}
                      >
                        <LoadingIcon />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.eventReducer,
  user: state.centerReducer,
  center: state.centerReducer
});

export default connect(
  mapStateToProps,
  {
    imageChangePrompt,
    pauseUpload,
    uploadImageAndGetUrl,
    cancelUpload,
    resumeUpload,
    modifyCenter
  }
)(ModifyCenterWrapper(ModifyCenterPage));

const propTypes = {
  imageChangePrompt: PropTypes.func.isRequired,
  cancelUpload: PropTypes.func.isRequired,
  resumeUpload: PropTypes.func.isRequired,
  uploadImageAndGetUrl: PropTypes.func.isRequired,
  modifyCenter: PropTypes.func.isRequired,
  pauseUpload: PropTypes.func.isRequired,
  center: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    centerToBeModified: PropTypes.arrayOf(PropTypes.shape({
      facilities: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      isAvailable: PropTypes.bool,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      type: PropTypes.string,
      rentalCost: PropTypes.string,
      mobileNumber: PropTypes.string,
      address: PropTypes.string,
      capacity: PropTypes.string
    })),
    imageUpload: PropTypes.shape({
      uploadProgress: PropTypes.number,
      imageUrl: PropTypes.string
    })
  }).isRequired
};

ModifyCenterPage.propTypes = propTypes;
