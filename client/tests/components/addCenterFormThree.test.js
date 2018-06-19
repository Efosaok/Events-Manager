import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { AddCenterFormThree }
  from '../../components/centers/container/AddCenterFormThree';

const props = {
  center: {
    status: {
      addedCosts: true,
    },
    primaryCenterDetails: {
      name: 'Modified Center',
      type: 'Multipurpose',
      mobileNumber: '08035272406',
      rentalCost: '23000',
      address: '23, Alhaji Bakare street',
      capacity: '1000000',
    },
    rentalCostAndFacilities: {
      facilities: ['swimming-pool', 'lounge'],
      rentalCost: '2300000',
    }
  },
  cancelUpload: jest.fn(() => {}),
  uploadImageAndGetUrl: jest.fn(() => {}),
  addCenter: jest.fn(() => {}),
  pauseUpload: jest.fn(() => {}),
  resumeUpload: jest.fn(() => {}),
  clearErrors: jest.fn(() => {}),
};

const wrapper = mount(<AddCenterFormThree {...props} />);

describe('Add center form three test suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders upload button when image has been chosen', () => {
    wrapper.find('.imageFile').simulate('change', {
      target: {
        name: 'imageFile',
        value: 'Image File'
      }
    });
    expect(wrapper.find('.upload-btn').exists()).toBeTruthy();
  });
  it(`pause, cancel button and upload progress bar
  is rendered when the upload is started`, () => {
    wrapper.find('.upload-btn').simulate('click');
    wrapper.setState({
      imageFile: 'New File',
    });
    wrapper.find('.upload-btn').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          addedCosts: true,
          uploadingImage: true,
        },
        primaryCenterDetails: {
          name: 'Modified Center',
          type: 'Multipurpose',
          mobileNumber: '08035272406',
          rentalCost: '23000',
          address: '23, Alhaji Bakare street',
          capacity: '1000000',
        },
        rentalCostAndFacilities: {
          facilities: ['swimming-pool', 'lounge'],
          rentalCost: '2300000',
        },
        imageUpload: {
          uploadProgress: 25,
        }
      },
    });
    expect(wrapper.find('.fa-pause').exists).toBeTruthy();
    expect(wrapper.find('.cancel-btn').exists).toBeTruthy();
  });

  it('renders the play button when the upload is paused', () => {
    wrapper.find('.fa-pause').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          addedCosts: true,
          uploadingImage: true,
          uploadImagePaused: true,
        },
        primaryCenterDetails: {
          name: 'Modified Center',
          type: 'Multipurpose',
          mobileNumber: '08035272406',
          rentalCost: '23000',
          address: '23, Alhaji Bakare street',
          capacity: '1000000',
        },
        rentalCostAndFacilities: {
          facilities: ['swimming-pool', 'lounge'],
          rentalCost: '2300000',
        },
        imageUpload: {
          uploadProgress: 25,
        }
      },
    });
    expect(wrapper.find('.fa-play').exists).toBeTruthy();
  });

  it('renders the pause button when the upload is resumed', () => {
    wrapper.find('.fa-play').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          addedCosts: true,
          uploadingImage: true,
          uploadImagePaused: false,
        },
        primaryCenterDetails: {
          name: 'Modified Center',
          type: 'Multipurpose',
          mobileNumber: '08035272406',
          rentalCost: '23000',
          address: '23, Alhaji Bakare street',
          capacity: '1000000',
        },
        rentalCostAndFacilities: {
          facilities: ['swimming-pool', 'lounge'],
          rentalCost: '2300000',
        },
        imageUpload: {
          uploadProgress: 25,
        }
      },
    });
    expect(wrapper.find('.fa-pause').exists).toBeTruthy();
  });

  it('does not renders the pause,play or progress bar when image upload is cancelled', () => {
    wrapper.find('.cancel-btn').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          addedCosts: true,
          uploadingImage: false,
          uploadingImagePaused: false,
          uploadedImage: true,
        },
        primaryCenterDetails: {
          name: 'Modified Center',
          type: 'Multipurpose',
          mobileNumber: '08035272406',
          rentalCost: '23000',
          address: '23, Alhaji Bakare street',
          capacity: '1000000',
        },
        rentalCostAndFacilities: {
          facilities: ['swimming-pool', 'lounge'],
          rentalCost: '2300000',
        },
        imageUpload: {
          uploadProgress: 25,
          imageUrl: 'image.com'
        }
      },
    });
    expect(wrapper.find('.fa-play').exists()).toBeFalsy();
  });

  it('creates a center when the finish button is clicked', () => {
    wrapper.find('.btn-addcenter').simulate('click');
    expect(props.addCenter).toHaveBeenCalledWith({
      name: 'Modified Center',
      type: 'Multipurpose',
      mobileNumber: '08035272406',
      address: '23, Alhaji Bakare street',
      capacity: '1000000',
      facilities: ['swimming-pool', 'lounge'],
      rentalCost: '2300000',
      imageUrl: 'image.com',
    });
    wrapper.setProps({
      center: {
        status: {
          addedCosts: true,
          addedCenter: true,
        },
        primaryCenterDetails: {
          name: 'Modified Center',
          type: 'Multipurpose',
          mobileNumber: '08035272406',
          rentalCost: '23000',
          address: '23, Alhaji Bakare street',
          capacity: '1000000',
        },
        rentalCostAndFacilities: {
          facilities: ['swimming-pool', 'lounge'],
          rentalCost: '2300000',
        },
        imageUpload: {
          uploadProgress: 25,
          imageUrl: 'image.com'
        }
      },
    });
  });

  it('redirects to all centers page after creating center', () => {
    expect(global.historyPath).toEqual('/centers');
  });
});
