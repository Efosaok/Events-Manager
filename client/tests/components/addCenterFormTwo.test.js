import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AddCenterFormTwo }
  from '../../components/centers/container/AddCenterFormTwo';

const props = {
  center: {
    rentalCostAndFacilities: {
      rentalCost: '23000',
      facilities: ['swimming-pool', 'lounge']
    },
    status: {
      error: false,
      addedPrimaryCenterDetails: true,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AddCenterFormTwo{...props} />);

describe('Add center form two test suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
