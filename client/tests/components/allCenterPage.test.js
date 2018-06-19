import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AllCenterPage }
  from '../../components/centers/container/AllCenterPage';

const props = {
  center: {
    allCenters: {
      currentPage: 2,
      pages: 3,
      centers: [{
        id: 1,
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }, {
        id: 1,
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }],
    },
    status: {
      fetchingCenter: false,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AllCenterPage {...props} />);

describe('all Center Page test suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
