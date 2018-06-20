import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isAdmin from '../../helpers/isAdmin';
import isSuperAdmin from '../../helpers/isSuperAdmin';
import { getAllCenters } from '../../actions/centerActions';

import { logOut } from '../../actions/userActions';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
   *
   *
   * @param {any} props
   * @memberof Navbar
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.logOut = this.logOut.bind(this);
    this.search = this.search.bind(this);
    this.getSearchValues = this.getSearchValues.bind(this);
  }
  /**
   *
   *
   * @param {any} event element event object
   * @memberof Navbar
   * @returns {object} sets state of component
   */
  getSearchValues(event) {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof Navbar
   * @returns {object} state after logout action
   */
  logOut(event) {
    event.preventDefault();
    this.props.logOut();
    browserHistory.push('/signin');
  }
  /**
   *
   *
   * @param {any} event element event object
   * @returns {action} action
   * @memberof Navbar
   */
  search(event) {
    event.preventDefault();
    const { name } = this.state;
    if (name === '') {
      return;
    }
    browserHistory.push('/search');
    this.props.getAllCenters({ name });
  }
  /**
   *
   *
   * @returns
   * @memberof Navbar
   * @returns {object} html document object
   */
  render() {
    const { authenticated } = this.props.user.status;
    return (
      <div>
        <nav
          className="navbar navbar-toggleable-md
          fixed-top bg-faded animated slideInDown"
          style={{ color: 'black', background: 'white', zIndex: '2' }}
        >
          <div
            className="navbar-toggler navbar-toggler-left"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: 'none' }}
          >
            <span style={{ color: '#F50057', fontSize: `${1.3}em` }}>☰</span>
          </div>
          <Link
            className="navbar-brand d-none d-lg-block"
            to="/"
            style={{ fontSize: `${1.3}em` }}
          >
            <span
              style={{
                backgroundColor: '#424242',
                color: 'white',
                borderRadius: '25%',
                border: '5px solid #424242',
                fontSize: '1.1em'
              }}
            >
              <b>Event</b>
            </span>
            <span
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#BDBDBD' }}
            >
              manager
            </span>
          </Link>
          <Link
            className="navbar-brand d-lg-none text-center"
            to="/"
            style={{ fontSize: `${1.3}em` }}
          >
            <span
              style={{
                backgroundColor: '#424242',
                color: 'white',
                borderRadius: '25%',
                border: '5px solid #424242',
                fontSize: '1.1em'
              }}
            >
              <b>Event</b>
            </span>
            <span
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#BDBDBD' }}
            >
              manager
            </span>
          </Link>

          <div
            className="navbar-collapse d-none
            d-lg-block nav justify-content-center"
          >
            <ul className="nav d-flex justify-content-center">
              <form
                className="form-inline my-4 my-lg-0 large-search"
                style={{ width: '350px' }}
              >
                <input
                  className="form-control mr-sm-2 search-lg"
                  type="text"
                  placeholder="Search"
                  name="name"
                  onChange={this.getSearchValues}
                  style={{
                    border: 'none',
                    borderBottom: '1px solid #F50057',
                    borderRadius: '0px',
                    width: '250px',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                />
                <button
                  className="btn btn-search my-2 my-sm-0 btn-search-lg"
                  type="submit"
                  style={{ border: 'none' }}
                  onClick={this.search}
                >
                  <span className="fa fa-search" style={{ color: '#F50057' }} />
                </button>
              </form>
            </ul>
          </div>
          <div
            className="navbar-collapse d-none d-lg-block
            nav justify-content-end"
          >
            <ul className="nav d-flex justify-content-center">
              {!authenticated && (
                <li className="nav-item">
                  <Link className="nav-link sign-up-lk" to="/signup">
                    sign up
                  </Link>
                </li>
              )}
              {!authenticated && (
                <li className="nav-item">
                  <Link className="nav-link sign-in-lk" to="/signin">
                    sign in
                  </Link>
                </li>
              )}
              {authenticated &&
                isAdmin() && (
                  <li>
                    <Link
                      className="nav-link auth-nav-links add-center-nav"
                      to="/addcenterone"
                    >
                      ADD CENTER
                    </Link>
                  </li>
                )}
              {authenticated && (
                <li>
                  <Link
                    className="nav-link auth-nav-links centers-nav"
                    to="/centers"
                  >
                    CENTERS
                  </Link>
                </li>
              )}
              {authenticated && (
                <li>
                  <Link
                    className="nav-link auth-nav-links add-event-nav"
                    to="/addevent"
                  >
                    ADD EVENT
                  </Link>
                </li>
              )}
              {authenticated && (
                <li>
                  <Link
                    className="nav-link auth-nav-links events-link"
                    to="/"
                  >
                    YOUR EVENTS
                  </Link>
                </li>
              )}
              {authenticated &&
                isSuperAdmin() && (
                  <li>
                    <Link
                      className="nav-link auth-nav-links grant-users-nav"
                      to="/users"
                    >
                      GRANT ACCESS
                    </Link>
                  </li>
                )}
              {authenticated && (
                <li>
                  <button
                    className="btn btn-logout auth-nav-links btn-logout-lg"
                    onClick={this.logOut}
                  >
                    LOG OUT
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div
            className="collapse text-center d-lg-none"
            id="navbarTogglerDemo02"
            style={{ backgroundColor: 'white' }}
          >
            <ul className="navbar-nav mr-auto mt-2 mt-md-0">
              {!authenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-center"
                    to="/signup"
                    style={{ color: 'grey', border: 'none' }}
                  >
                    Sign Up
                  </Link>
                </li>
              )}

              {!authenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link signin-nav"
                    to="/signin"
                    style={{ border: 'none' }}
                  >
                    Sign In
                  </Link>
                </li>
              )}
              {authenticated && (
                <li className="nav-item" style={{ border: 'none' }}>
                  <Link
                    className="nav-link"
                    to="/addevent"
                    style={{ border: 'none' }}
                  >
                    Add event
                  </Link>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    style={{ border: 'none' }}
                  >
                    Your events
                  </Link>
                </li>
              )}
              {authenticated &&
                isAdmin() && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/addcenterone"
                      style={{ border: 'none' }}
                    >
                      Add center
                    </Link>
                  </li>
                )}
              {authenticated && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/centers"
                    style={{ border: 'none' }}
                  >
                    Centers
                  </Link>
                </li>
              )}
              {authenticated &&
                isSuperAdmin() && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/users"
                      style={{ border: 'none' }}
                    >
                      Grant Access
                    </Link>
                  </li>
                )}
              {authenticated && (
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={this.logOut}
                    style={{ color: 'grey' }}
                  >
                    LOG OUT
                  </button>
                </li>
              )}
            </ul>
            <form
              className="form-inline my-2 my-lg-0 text-center smallnavsection"
              style={{ textAlign: 'center' }}
            >
              <input
                className="form-control mr-sm-2 smallnavsearch"
                type="text"
                placeholder="Search"
                name="name"
                onChange={this.getSearchValues}
                style={{
                  border: 'none',
                  borderBottom: '1px solid #F50057',
                  borderRadius: '0px',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              />
              <button
                className="btn btn-search my-2 my-sm-0"
                type="submit"
                style={{ border: 'none' }}
                onClick={this.search}
              >
                <span className="fa fa-search" style={{ color: '#F50057' }} />
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToprops = state => ({
  user: state.userReducer
});

export default connect(
  mapStateToprops,
  {
    logOut,
    getAllCenters
  }
)(Navbar);

const propTypes = {
  logOut: PropTypes.func.isRequired,
  getAllCenters: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired
};

Navbar.propTypes = propTypes;
