import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import OneCenterPage
  from '../../components/centers/presentational/OneCenterPage';

const props = {
  center: {
    name: 'New Center',
    facilities: ['swimming-pool', 'lounge'],
    id: '1',
    rentalCost: '235000',
    imageUrl: 'https://firebase.com/your-image',
    capacity: '2300000',
    venueOfEvent: [
      {
        id: '1',
        name: 'Nice Event',
      }
    ]
  },
  cancelEvent: jest.fn(() => {}),
  eventStatus: {
    cancellingEvent: true,
  },
};
const firstWrapper = shallow(<OneCenterPage {...props} />);

describe('oneCenter page component test-suite', () => {
  it('mounts centercard component', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
