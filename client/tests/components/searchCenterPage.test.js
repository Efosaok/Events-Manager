import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { SearchCenterPage }
  from '../../components/centers/container/SearchCenterPage';

const props = {
  center: {
    allCenters: {
      currentPage: 2,
      pages: 3,
      centers: [{
        id: '1',
        name: 'Nice Center',
        type: 'Multipurpose Hall',
        facilities: ['swimming-pool']
      }]
    },
    status: {
      fetchingCenter: false,
    }
  },
  promptSeeCenter: jest.fn(() => {}),
  modificationPrompt: jest.fn(() => {}),
  getAllCenters: jest.fn(() => {}),
  actionRejectedPrompter: jest.fn(() => {}),
};
localStorage.setItem(
  'x-access-token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjcyMDRlOC0zNDAyLTQzN2QtYTZmZi04OGNlMGJmNGUzYzgiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyODk4NjAzNiwiZXhwIjoxNTI5MzQ2MDM2fQ.2PDYoQQiMH3HJFxFNpMRwHlIMgvU7mvgJdyJvjhVX3Q' // eslint-disable-line
);
const wrapper = mount(<SearchCenterPage {...props} />);

describe('search center page', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets the state to the value of input field', () => {
    wrapper.find('.input-search').simulate('change', {
      target: { name: 'searchQueryValue', value: 'New' }
    });
    expect(wrapper.state().searchQueryValue).toEqual('New');
  });

  it(`shows an error prompt if you click on search
  and input field is empty`, () => {
    wrapper.find('.input-search').simulate('change', {
      target: { name: 'searchQueryValue', value: '' }
    });
    wrapper.find('.btn-search-l').simulate('click');
    expect(props.actionRejectedPrompter)
      .toHaveBeenCalledWith('search field cannot be empty');
  });

  it(`shows an error prompt if you click on
  search and input field is empty`, () => {
    wrapper.find('.input-search').simulate('change', {
      target: { name: 'searchQueryValue', value: 'Ne' }
    });
    wrapper.find('.btn-search-l').simulate('click');
    expect(props.actionRejectedPrompter)
      .toHaveBeenCalledWith('Please select type of search');
  });

  it(`searches by name or rentalCost if
  corresponding radio button is clicked`, () => {
    wrapper.find('.radio-name').simulate('click');
    wrapper.find('.btn-search-l').simulate('click');
    expect(props.getAllCenters).toHaveBeenCalled();
  });

  it(`redirects to the modifycenter page
  if modification button is clicked`, () => {
    wrapper.find('.modify-btn').simulate('click');
    expect(global.historyPath).toEqual('/modifycenter');
  });

  it('redirects to a center page if modification button is clicked', () => {
    wrapper.find('.detail-btn').simulate('click');
    expect(global.historyPath).toEqual('/center');
  });

  it('fetches more centers if pagination link is clicked', () => {
    wrapper.find('.next').simulate('click');
    expect(props.getAllCenters).toHaveBeenCalled();
  });
});
