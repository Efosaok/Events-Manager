import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import PropTypes from 'prop-types';

import correspondent1 from '../../public/images/correspondent1.jpg';
import correspondent2 from '../../public/images/correspondent2.jpg';
import UnauthenticatedPages from '../HOC/UnauthenticatedPages';
import { LargeLoadingIcon } from '../../components/utils/LoaderComponents';
import { promptSeeCenter, getAllCenters } from '../../actions/centerActions';

const methods = {
  componentDidMount(props) {
    props.dispatch(getAllCenters());
  }
};

export const LandingPageBody = (props) => {
  const { fetchingCenters, fetched, error } = props.center.status;
  const { centers } = props.center.allCenters;
  const seeACenter = (event) => {
    event.preventDefault();
    props.dispatch(promptSeeCenter(event.target.id));
    browserHistory.push('/center');
  };
  return (
    <div>
      {fetchingCenters && (
        <div>
          <LargeLoadingIcon />
        </div>
      )}
      {(fetched || error) && (
        <div>
          <div
            id="home"
            className="view jarallax hm-black-slight"
            data-jarallax="{&quot;speed&quot;: 0.2}"
            max-height="device-height"
            style={{
              marginTop: '0%',
              color: 'black',
              fontFamily: 'Open Sans, sans-serif'
            }}
          >
            <div className="full-bg-img animated slideInDown">
              <div className="container flex-center">
                <div className="row smooth-scroll">
                  <div className="col-md-12 text-center white-text">
                    <div className="wow fadeInDown" data-wow-delay="0.2s">
                      <h1
                        className="white-text display-3 font-bold"
                        style={{ color: 'white', marginTop: '20%' }}
                      >
                        <em>
                          Manage Your
                          <strong> Events Easily</strong>
                        </em>
                      </h1>
                      <Link
                        to="/signup"
                        href="#rooms"
                        className="btn dark-grey-text
                        font-bold btn-rounded spacing"
                        data-offset="100"
                      >
                        <button
                          className="btn btn-lg btn-get-started"
                          style={{
                            color: 'white',
                            backgroundColor: '#F50057',
                            fontFamily: 'Open Sans, sans-serif'
                          }}
                        >
                          GET STARTED
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!error && (
            <div className="upcoming-events-section container">
              <h3 className="upcoming-events-section-header">
                Featured Event Centers
              </h3>
              <div className="row">
                <div className="upcoming-events col-xs-12
                  col-sm-6 col-md-6 col-lg-4"
                >
                  <div className="card feature-center-card">
                    <img
                      className="card-img-top"
                      src={centers[0].imageUrl}
                      alt="Your browser does not support"
                      style={{ width: '100%', height: '240px' }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{centers[0].name}</h4>
                      <p className="card-text date-of-event">
                        # {centers[0].rentalCost}
                      </p>
                      <div className="card-menu d-flex justify-content-end">
                        <button
                          className="btn c-menu"
                          id={centers[0].id}
                          onClick={seeACenter}
                        >
                          see info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="upcoming-events col-xs-12
                  col-sm-6 col-md-6 col-lg-4"
                >
                  <div className="card feature-center-card">
                    <img
                      className="card-img-top"
                      src={centers[1].imageUrl}
                      alt="Your browser does not support"
                      style={{ width: '100%', height: '240px' }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{centers[1].name}</h4>
                      <p className="card-text date-of-event">
                        # {centers[1].rentalCost}
                      </p>
                      <div className="card-menu d-flex justify-content-end">
                        <button
                          className="btn c-menu"
                          id={centers[1].id}
                          onClick={seeACenter}
                        >
                          see info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="upcoming-events col-xs-12
                  col-sm-6 col-md-6 col-lg-4"
                >
                  <div className="card feature-center-card">
                    <img
                      className="card-img-top"
                      src={centers[2].imageUrl}
                      alt="Your browser does not support"
                      style={{ height: '240px' }}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{centers[2].name}</h4>
                      <p className="card-text date-of-event">
                        # {centers[2].rentalCost}
                      </p>
                      <div className="card-menu d-flex justify-content-end">
                        <button
                          className="btn c-menu"
                          id={centers[2].id}
                          onClick={seeACenter}
                        >
                          see info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="about-us-section container">
            <h3 className="about-us-section-header text-center">
              How Event Manager Works
            </h3>
            <div className="about-us row">
              <div
                className="col-xs-12 col-sm-12 col-md-6 col-lg-6 first-info"
                style={{ width: '600px', borderBottom: '20px solid #212121' }}
              >
                <div className="info-icon text-center">
                  <i
                    className="fa fa-plus text-center"
                    style={{ color: '#C51162' }}
                  />
                </div>
                <div className="info-text" style={{ fontSize: '1.8em' }}>
                  <p className="text-center" style={{ color: 'white' }}>
                    add an event in a few steps
                  </p>
                </div>
                <div className="join-us text-center">
                  <Link to="/signup">
                    <button className="btn join-us-btn">sign up now</button>
                  </Link>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-12 col-md-6 col-lg-6 second-info"
                style={{ width: '600px', borderBottom: '20px solid #212121' }}
              >
                <div className="info-icon text-center">
                  <i
                    className="fa fa-check text-center"
                    style={{ color: '#C51162' }}
                  />
                </div>
                <div className="info-text" style={{ fontSize: '1.8em' }}>
                  <p className="text-center" style={{ color: 'white' }}>
                    get a center for your event
                  </p>
                </div>
                <div className="join-us text-center">
                  <Link to="/centers">
                    <button className="btn view-centers-btn">
                      view centers
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonies-section container">
            <h3
              className="text-center testimonies-section-header"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              What People Are Saying
            </h3>
            <div className="testimonies row">
              <div className="col-xs-12 col-sm-12 col-md-6
                col-lg-6 first-testimony"
              >
                <div className="text-center">
                  <img
                    className="img rounded-circle img-correspondent"
                    alt="no browser support"
                    src={correspondent1}
                  />
                  <div className="testimony-text-section">
                    <p className="text-center testimony-info">
                      Making Arrangements for my Birthday was so much easier as
                      I did not have to worry about the center for the event.
                      <br />
                      <span className="name-testimonial">
                        <b>- Kolawole taiwo</b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6
                col-lg-6 second-testimony"
              >
                <div className="text-center">
                  <img
                    className="img rounded-circle img-correspondent"
                    alt="no browser support"
                    src={correspondent2}
                  />
                  <div className="text-center testimony-text-section">
                    <p className="testimony-info">
                      Organising business meetings and conferences has been much
                      more efficient with event manger, it really makes my
                      business life easier.<br />
                      <span className="name-testimonial">
                        <b>- Felix Amande</b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch: actionObject => dispatch(actionObject)
});

const mapStateToProps = state => ({
  center: state.centerReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(UnauthenticatedPages(LandingPageBody)));

LandingPageBody.propTypes = {
  dispatch: PropTypes.func.isRequired,
  center: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        rentalCost: PropTypes.string
      })),
      pages: PropTypes.number,
      currentPage: PropTypes.number
    })
  }).isRequired
};
