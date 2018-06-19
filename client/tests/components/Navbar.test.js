import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Navbar } from '../../components/utils/Navbar';

const props = {
  user: {
    status: {
      authenticated: false,
    }
  },
  logOut: jest.fn(() => {}),
  getAllCenters: jest.fn(() => {}),
  getSearchValues: jest.fn(() => {}),
};
const wrapper = mount(<Navbar {...props} />);

describe('Navbar component test-suite', () => {
  it('mounts the unauthenticated nav links', () => {
    expect(wrapper.find('.signin-nav').exists()).toBeTruthy();
  });
  it(`mounts authenticatedPart of the component
  if user is authenticated`, () => {
    localStorage.setItem(
      'x-access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjcyMDRlOC0zNDAyLTQzN2QtYTZmZi04OGNlMGJmNGUzYzgiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyODk4NjAzNiwiZXhwIjoxNTI5MzQ2MDM2fQ.2PDYoQQiMH3HJFxFNpMRwHlIMgvU7mvgJdyJvjhVX3Q' // eslint-disable-line
    );
    const secondWrapper = mount(<Navbar {...props} />);
    expect(secondWrapper.find('.btn-logout'));
  });
  it('gets search data from input field user types on it', () => {
    wrapper.find('.search-lg')
      .simulate('change', { target: { name: 'name', value: 'Ne' } });
    expect(wrapper.state().name).toEqual('Ne');
  });
  it('redirects user to search page if the search button is clicked', () => {
    wrapper.setState({
      name: '',
    });
    wrapper.find('.btn-search-lg').simulate('click');
    wrapper.setState({
      name: 'Ne',
    });
    wrapper.find('.btn-search-lg').simulate('click');
  });
  it('redirects to the login page if logout is clicked', () => {
    wrapper.setProps({
      user: {
        status: {
          authenticated: true,
        }
      },
    });
    localStorage.setItem(
      'x-access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjcyMDRlOC0zNDAyLTQzN2QtYTZmZi04OGNlMGJmNGUzYzgiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyODk4NjAzNiwiZXhwIjoxNTI5MzQ2MDM2fQ.2PDYoQQiMH3HJFxFNpMRwHlIMgvU7mvgJdyJvjhVX3Q' // eslint-disable-line
    );
    wrapper.find('.btn-logout-lg').simulate('click');
    expect(global.historyPath).toEqual('/signin');
  });
});
