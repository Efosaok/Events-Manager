import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { ModifyCenterPage } from '../../components/centers/container/ModifyCenterPage';

const spy = sinon.spy();

const props = {
  center: {
    centerToBeModified: [
      {
        facilities: ['swimming-pool', 'lounge'],
        id: '1',
        name: 'New Center',
        isAvailable: true,
        imageUrl: 'https://my-image.firebase.com',
        type: 'Multipurpose hall',
        rentalCost: '23000',
        mobileNumber: '0803565467846',
        address: '23, your adderess',
        capacity: '23000',
      }
    ],
    imageUpload: {
      uploadProgress: '20%',
      imageUrl: '',
    },
    status: {
      fetchingCenter: false,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<ModifyCenterPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('it should render other things', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        changeImagePrompted: true,
        uploadingImage: false,
      }
    });
    expect(wrapper.find('.change-image-section')).toBeTruthy();
    wrapper.find('.name').simulate('change');
    expect(props.dispatch.calledOnce).toBeTruthy();
  });
  it('it should render other things', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        uploadImagePaused: false,
        uploadingImage: false,
      }
    });
    expect(wrapper.find('.center-image-section')).toBeTruthy();
  });
  it('it should render upload progress bar', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        uploadImagePaused: true,
        uploadingImage: true,
      }
    });
    expect(wrapper.find('.center-image-section')).toBeTruthy();
  });
  it('it should render upload progress bar', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        uploadImagePaused: true,
        uploadingImage: true,
      }
    });
    expect(wrapper.find('.uploadbar-m')).toBeTruthy();
    expect(props.dispatch.calledOnce).toBeTruthy();
  });
  it('simulates click', () => {
    wrapper.find('.btn-save-m').simulate('click');
    expect(props.dispatch.calledOnce).toBeTruthy();
  });
  it('unmounts the component', () => {
    wrapper.unmount();
    expect(spy.calledOnce).toBeTruthy();
  });
});
