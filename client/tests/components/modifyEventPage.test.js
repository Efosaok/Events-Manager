import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { ModifyEventPage }
  from '../../components/events/container/ModifyEventPage';

const props = {
  center: {
    allCenters: {
      centers: [
        {
          id: '1',
          name: 'Nice Center',
          type: 'Multipurpose Hall'
        },
        {
          id: '3',
          name: 'Nice Center',
          type: 'Multipurpose Hall'
        }
      ]
    },
    status: {
      fetchingCenter: false
    }
  },
  event: {
    eventObject: [
      {
        name: 'My Birthday',
        id: '1',
        center: 'jh8787',
        type: 'Birthday',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
      }
    ],
    status: {
      modifyingEvent: true
    }
  },
  getAllCenters: jest.fn(() => {}),
  actionRejectedPrompter: jest.fn(() => {}),
  modifyEvent: jest.fn(() => {}),
  promptModify: jest.fn(() => {})
};
localStorage.setItem('eventObject', 'new data');
const wrapper = mount(<ModifyEventPage {...props} />);

describe('modify Event page', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('prefills value on the input field', () => {
    expect(wrapper.find('.name').props().defaultValue).toEqual('My Birthday');
  });

  it('saves data from input field when user types', () => {
    wrapper
      .find('.name')
      .simulate('change', { target: { value: '00000', name: 'name' } });
    expect(wrapper.state().name).toEqual('00000');
  });

  it('shows a prompt when error occurs in data validation', () => {
    wrapper.find('.btn-submit').simulate('click', { preventDefault: () => {} });
    expect(props.actionRejectedPrompter).toHaveBeenCalledWith([
      'name cannot be digits or alphanumeric characters'
    ]);
  });

  it(`modifies event when the modify event button
  is clicked and redirects to user events page`, () => {
    wrapper.find('.name').simulate('change', {
      target: { value: 'Modified Event', name: 'name' }
    });
    wrapper.find('.btn-submit').simulate('click', { preventDefault: () => {} });
    expect(props.modifyEvent).toHaveBeenCalled();
    wrapper.setProps({
      center: {
        allCenters: {
          centers: [
            {
              id: '1',
              name: 'Nice Center',
              type: 'Multipurpose Hall'
            },
            {
              id: '3',
              name: 'Nice Center',
              type: 'Multipurpose Hall'
            }
          ]
        },
        status: {
          fetchingCenter: false
        }
      },
      event: {
        eventObject: [
          {
            name: 'My Birthday',
            id: '1',
            center: 'jh8787',
            type: 'Birthday',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString()
          }
        ],
        status: {
          eventIsModified: true,
        }
      },
    });
    expect(global.historyPath).toEqual('/');
    wrapper.unmount();
  });
});
