import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CenterCard from '../presentational/CenterCard';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';
import { LargeLoadingIcon } from '../../utils/LoaderComponents';
import PaginationLinks from '../../utils/PaginationLinks';
import {
  getAllCenters,
  modificationPrompt,
  promptSeeCenter
} from '../../../actions/centerActions';
/**
 *
 * @class SearchPage
 * @extends {Component}
 */
export class SearchCenterPage extends Component {
/**
 * Creates an instance of SearchPage.
 * @param {any} props
 * @memberof SearchPage
 */
  constructor(props) {
    super(props);
    this.state = {
      searchQueryValue: '',
      searchQueryType: '',
    };
    this.promptModifyCenter = this.promptModifyCenter.bind(this);
    this.promptSeeCenter = this.promptSeeCenter.bind(this);
    this.getSearchValues = this.getSearchValues.bind(this);
    this.search = this.search.bind(this);
    this.fetchMoreCenters = this.fetchMoreCenters.bind(this);
  }

  /**
   *
   * @returns {object} sets state of app
   * based on input
   * @param {any} event
   * @memberof SearchPage
   */
  getSearchValues(event) {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /**
 *
 * @param {any} event
 * @memberof CenterPage
 * @returns {object} state after object dispatched
 */
  promptModifyCenter(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.modificationPrompt(id);
    browserHistory.push('/modifycenter');
  }
  /**
 *
 *
 * @param {any} event
 * @memberof SearchPage
 * @returns {function} action dispatcher
 */
  fetchMoreCenters(event) {
    const { id } = event.target;
    const { searchQueryValue, searchQueryType } = this.state;
    this.props.getAllCenters({
      [searchQueryType]: searchQueryValue,
      page: id
    });
  }
  /**
 *
 *
 * @param {event} event the event object of html document
 * @memberof SearchPage
 * @returns {func} function that dispatches action
 */
  search(event) {
    event.preventDefault();
    const { searchQueryValue, searchQueryType } = this.state;
    if (searchQueryValue === '') {
      return this.props.actionRejectedPrompter('search field cannot be empty');
    }
    if (searchQueryType === '') {
      return this.props.actionRejectedPrompter('Please select type of search');
    }
    this.props.getAllCenters({ [searchQueryType]: searchQueryValue });
  }
  /**
*
*
* @param {any} event
* @memberof CenterPage
* @returns {object} state after action dispatched
*/
  promptSeeCenter(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.promptSeeCenter(id);
    browserHistory.push('/center');
  }
  /**
 *
 *
 * @memberof SearchPage
 * @returns {object} html dom of component
 */
  render() {
    const searchResults = this.props.center.allCenters ?
      this.props.center.allCenters.centers : null;
    const { fetchingCenters, error } = this.props.center.status;
    const { pages, currentPage } = this.props.center.allCenters;
    return (
      <div style={{ marginTop: '100px' }}>
        <form className="form-search container">
          <div className="radio-section text-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio-name"
                type="radio"
                id="inlineRadio1"
                value="name"
                name="searchQueryType"
                onClick={this.getSearchValues}
              />
              <label
                className="form-check-label"
                htmlFor="inlineRadio1"
              >search by name
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio-cost"
                type="radio"
                id="inlineRadio2"
                value="rentalCost"
                name="searchQueryType"
                onClick={this.getSearchValues}
              />
              <label
                className="form-check-label label-2"
                htmlFor="inlineRadio2"
              >search by rental cost
              </label>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-9 col-sm-12 col-xs-12 col-md-9">
              <input
                type="text"
                className="form-control input-search form-search-l"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search Centers"
                name="searchQueryValue"
                onChange={this.getSearchValues}
              />
            </div>
            <div className="col-lg-3 col-md-3">
              <button
                type="submit"
                className="btn mb-2 btn-search-l"
                onClick={this.search}
              >SEARCH
              </button>
            </div>
          </div>
        </form>
        <div
          className="search-results-div container-fluid"
          style={{ marginLeft: '20px' }}
        >
          {(searchResults.length !== 0 && !fetchingCenters) &&
          <div>
            <h3 className="text-center search-header">SEARCH RESULTS</h3>
          </div>
          }
          {fetchingCenters ?
            <div className="text-center">
              <LargeLoadingIcon />
            </div> :
            <div>
              {(searchResults !== null) &&
              <div className="row container-fluid">
                {searchResults.map(result =>
                  (<CenterCard
                    center={result}
                    key={result.id}
                    promptModifyCenter={this.promptModifyCenter}
                    promptSeeCenter={this.promptSeeCenter}
                  />
                  ))}
              </div>}
            </div>}
          {(pages !== 1 && searchResults.length !== 0 && !fetchingCenters) &&
            <div className="text-center">
              <PaginationLinks
                fetchPage={this.fetchMoreCenters}
                currentPage={currentPage}
                totalPages={pages}
              />
            </div>}
          {(!fetchingCenters && searchResults.length === 0 && error) &&
            <div
              className="text-center no-results"
              style={{ marginTop: '120px' }}
            >
              <h2> Your Search Returned No results</h2>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    center: state.centerReducer,
  });

export default connect(mapStateToProps, {
  getAllCenters,
  modificationPrompt,
  promptSeeCenter,
  actionRejectedPrompter,
})(SearchCenterPage);

SearchCenterPage.propTypes = {
  getAllCenters: PropTypes.func.isRequired,
  modificationPrompt: PropTypes.func.isRequired,
  promptSeeCenter: PropTypes.func.isRequired,
  actionRejectedPrompter: PropTypes.func.isRequired,
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      message: PropTypes.string,
      currentPage: PropTypes.number,
      pages: PropTypes.number,
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
      }))
    }),
    status: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
};
