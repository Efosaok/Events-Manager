import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { SigninPage } from '../../components/users/container/SigninPage';

const props = {
  user: {
    status: {
      authenticated: false,
    },
    unauthenticatedErrorMessage: 'None',
    errorMessage: 'No errors',
  },
  dispatch: jest.fn(() => {}),
  actionRejectedPrompter: jest.fn(() => {}),
  userLogin: jest.fn(() => {}),
  clearError: jest.fn(() => {}),
};

const wrapper = mount(<SigninPage {...props} />);

describe('SigninPage component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('redirects back to dashboard if user is authenticated', () => {
    localStorage.setItem(
      'x-access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjcyMDRlOC0zNDAyLTQzN2QtYTZmZi04OGNlMGJmNGUzYzgiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyODk4NjAzNiwiZXhwIjoxNTI5MzQ2MDM2fQ.2PDYoQQiMH3HJFxFNpMRwHlIMgvU7mvgJdyJvjhVX3Q' // eslint-disable-line
    );
    const changedProps = {
      ...props,
      user: {
        status: {
          authenticated: true,
        }
      }
    };
    mount(<SigninPage {...changedProps} />);
    expect(global.historyPath).toEqual('/events');
  });
  it('sets state to values from input field', () => {
    wrapper
      .find('.email')
      .simulate('change', {
        target: { value: 'efosaokpugie@gmail.com', name: 'email' }
      });
    wrapper
      .find('.password-signin')
      .simulate('change', {
        target: { value: 'swalllious', password: 'swampious' }
      });

    expect(wrapper.state().email).toEqual('efosaokpugie@gmail.com');
  });

  it('shows a prompt upon failed validation', () => {
    wrapper.setProps({
      ...props,
      user: {
        status: {
          ...props.user.status,
          fetching: true,
        }
      }
    });
    wrapper
      .find('.email')
      .simulate('change', {
        target: { value: 'efosaokpugie@gmail.com', name: 'email' }
      });
    wrapper
      .find('.btn-submit')
      .simulate('click');
    expect(props.actionRejectedPrompter)
      .toHaveBeenCalledWith(['password field is required']);
  });

  it('calls signs up user action on successful action', () => {
    wrapper
      .find('.email')
      .simulate('change', {
        target: { value: 'efosaokpugie@gmail.com', name: 'email' }
      });
    wrapper
      .find('.password-signin')
      .simulate('change', {
        target: { value: 'swalllious', name: 'password' }
      });
    wrapper
      .find('.btn-submit')
      .simulate('click');
    expect(props.userLogin).toHaveBeenCalled();
  });

  it('redirects to centers page if authenticated user is admin', () => {
    localStorage.setItem(
      'x-access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjcyMDRlOC0zNDAyLTQzN2QtYTZmZi04OGNlMGJmNGUzYzgiLCJyb2xlIjoiU3VwZXJBZG1pbiIsImlhdCI6MTUyODk4NjAzNiwiZXhwIjoxNTI5MzQ2MDM2fQ.2PDYoQQiMH3HJFxFNpMRwHlIMgvU7mvgJdyJvjhVX3Q' // eslint-disable-line
    );
    wrapper.setProps({
      ...props,
      user: {
        status: {
          authenticated: true,
        }
      }
    });
    expect(global.historyPath).toEqual('/centers');
    localStorage.removeItem('x-access-token');
  });

  it('redirects to home page if authenticated user is not  admin', () => {
    wrapper.setProps({
      ...props,
      user: {
        status: {
          authenticated: true,
        }
      }
    });
    expect(global.historyPath).toEqual('/');
  });

  it('calls the clear error action when unmounted', () => {
    wrapper.unmount();
    expect(props.clearError).toHaveBeenCalled();
  });
});
