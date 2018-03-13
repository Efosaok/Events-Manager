import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut } from '../actions/userActions';

/**
 * 
 * 
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {
  /**
   * 
   * 
   * @param {any} event 
   * @memberof Navbar
   * @returns 
   */
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  /**
   * 
   *
   * @param {any} event
   * @memberof Navbar
   * @returns object
   */
  logOut(event) {
    event.preventDefault();
    this.props.dispatch(logOut());
  }
/**
 * 
 * 
 * @returns 
 * @memberof Navbar
 */
  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md fixed-top bg-faded" style={{ color: 'pink', backgroundColor: 'black' }}>
          <div className="navbar-toggler navbar-toggler-left" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ border: 'none' }}>
            <span style={{ color: 'pink', fontSize: `${1.3}em` }}>☰</span>
          </div>
          <Link className="navbar-brand d-none d-lg-block" to="/addevents" style={{ fontSize: `${1.3}em`, color: 'pink' }}>Events-manager</Link>
          <Link className="navbar-brand d-lg-none text-center" to="/addevents" style={{ fontSize: `${1.3}em`, color: 'pink' }}>events-manager</Link>

          <div className="navbar-collapse d-none d-lg-block">
            <form className="form-inline my-4 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" style={{ border: `${1}px solid pink`, width: '400px' }} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ border: `${1}px solid pink` }} ><span className="fa fa-search" style={{ color: 'pink'}}></span></button>
            </form>
            <ul className="navbar-nav mr-auto mt-2 mt-md-0" style={{ marginLeft: '350px', color: 'pink' }}>
              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={{ color: 'pink' }}><b>Sign Up</b></Link>
              </li>}
              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ color: 'pink' }}><b>Sign In</b></Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li>
                <button className="btn btn-outline-danger" onClick={this.logOut}>LOG OUT</button>
              </li>}
            </ul>
          </div>

          <div className="collapse text-center d-lg-none text-center" id="navbarTogglerDemo02" style={{ backgroundColor: "white" }}>
            <ul className="navbar-nav mr-auto mt-2 mt-md-0">
              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={{ color: 'grey' }}>Sign Up</Link>
              </li>}

              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ color: 'grey' }}>Sign In</Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/addevent" style={{ color: 'grey' }}>Add events</Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="#" style={{ color: 'grey' }}>My events</Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="#" style={{ color: 'grey' }}>All centers</Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/addcenterone" style={{ color: 'grey' }}>Add center</Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <button className="btn btn-danger btn-block" onClick={this.logOut} style={{ color: 'grey' }}>LOG OUT</button>
              </li>}
            </ul>
            <form className="form-inline my-2 my-lg-0 text-center smallnavsection">
              <input className="form-control mr-sm-2 smallnavsearch" type="text" placeholder="Search" style={{ border: `${1}px solid pink` }} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ border: `${1}px solid pink` }}><span className="fa fa-search" style={{ color: 'black' }}></span></button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: actionObject => dispatch(actionObject)
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer.status,
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
  dispatch: PropTypes.objectOf(PropTypes.string).isRequired,
};

Navbar.propTypes = propTypes;
