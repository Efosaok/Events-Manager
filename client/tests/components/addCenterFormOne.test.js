import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { AddCenterFormOne }
  from '../../components/centers/container/AddCenterFormOne';

let props = {
  center: {},
  actionRejectedPrompter: jest.fn((error) => {}),
  getPrimaryCenterDetails: jest.fn((details) => {})
};

let wrapper = mount(<AddCenterFormOne {...props} />);
describe('Add center form one component test suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('makes toast prompt visible on validation failure', () => {
    wrapper.find('.btn-add').simulate('click');
    expect(props.actionRejectedPrompter).toHaveBeenCalledWith([
      'name is required',
      'type is required',
      'capacity is required',
      'mobileNumber is required',
      'address is required'
    ]);
  });

  it(`saves validated data and redirects to the
  next form after successfull validation`, () => {
    wrapper
      .find('.c-name')
      .simulate('change', { target: { value: 'Nice Center', name: 'name' } });
    wrapper
      .find('.type')
      .simulate('change', { target: { value: 'Club', name: 'type' } });
    wrapper
      .find('.capacity')
      .simulate('change', { target: { value: '23000', name: 'capacity' } });
    wrapper.find('.address').simulate('change', {
      target: { value: '23, Bakare street', name: 'address' }
    });
    wrapper.find('.mobileNumber').simulate('change', {
      target: { value: '08035272406', name: 'mobileNumber' }
    });
    wrapper.find('.btn-add').simulate('click');
    expect(props.getPrimaryCenterDetails).toHaveBeenCalledWith({
      name: 'Nice Center',
      type: 'Club',
      capacity: '23000',
      address: '23, Bakare street',
      mobileNumber: '08035272406'
    });
    expect(global.historyPath).toEqual('/addcentertwo');
  });

  it(`prefills the values if returning from
  another add center form component`, () => {
    props = {
      center: {
        primaryCenterDetails: {
          name: 'Nice Center',
          type: 'Multipurpose',
          address: '23, alhaji'
        }
      },
      actionRejectedPrompter: jest.fn((error) => {}),
      getPrimaryCenterDetails: jest.fn((details) => {})
    };
    wrapper = mount(<AddCenterFormOne {...props} />);
    expect(wrapper.find('.c-name').props().defaultValue).toEqual('Nice Center');
    expect(wrapper.find('.type').props().defaultValue).toEqual('Multipurpose');
  });
});
