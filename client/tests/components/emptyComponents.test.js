import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { EmptyEventList, EmptyCenterList }
  from '../../components/utils/emptyComponents';

const wrapper = shallow(<EmptyEventList />);
const secondWrapper = shallow(<EmptyCenterList />);

describe('Empty Components test-suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should render self and sub components', () => {
    expect(secondWrapper.exists()).toBe(true);
  });
});
