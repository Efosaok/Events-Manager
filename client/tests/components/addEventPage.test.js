import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { AddEventPage } from '../../components/events/container/AddEventPage';

const props = {
  center: {
    allCenters: {
      centers: [{
        id: '1',
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }, {
        id: '3',
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }],
    },
    status: {
      fetchingCenter: false,
    }
  },
  event: {
    status: {
      creatingEVent: true,
    }
  },
  getAllCenters: jest.fn(() => {}),
  addEvent: jest.fn(() => {}),
  actionRejectedPrompter: jest.fn(() => {}),
};

const wrapper = mount(<AddEventPage {...props} />);

describe('Add event page test suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('saves data to state when user types on an input field', () => {
    wrapper.find('.name').simulate('change', {
      target: { name: 'name', value: 'My Birthday' }
    });
    expect(wrapper.state().name).toEqual('My Birthday');
  });

  it('makes a prompt visible when input validation occurs', () => {
    wrapper.find('.type').simulate('change', {
      target: { name: 'type', value: 'Birthday' }
    });
    wrapper.find('.btn-submit').simulate('click');
    expect(wrapper.props().actionRejectedPrompter).toHaveBeenCalledWith([
      'center is required',
      'startDate is required',
      'endDate is required',
      'Please specify both the start and end dates of the event',
    ]);
  });

  it('creates an event and redirects to the userevents page', () => {
    wrapper.find('.startDate').simulate('change', {
      target: { name: 'startDate', value: '08/08/2018' }
    });
    wrapper.find('.endDate').simulate('change', {
      target: { name: 'endDate', value: '08/08/2018' }
    });
    wrapper.find('.center').simulate('change', {
      target: { name: 'center', value: '123' }
    });
    wrapper.find('.btn-submit').simulate('click');
    wrapper.setProps({
      center: {
        allCenters: {
          centers: [{
            id: '1',
            name: 'Nice Center',
            type: 'Multipurpose Hall'
          }, {
            id: '3',
            name: 'Nice Center',
            type: 'Multipurpose Hall'
          }],
        },
        status: {
          fetchingCenter: false,
        }
      },
      event: {
        status: {
          added: true,
        }
      },
    });
    expect(global.historyPath).toEqual('/');
  });
});
