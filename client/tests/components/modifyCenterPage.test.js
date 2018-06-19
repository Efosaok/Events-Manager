import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { ModifyCenterPage }
  from '../../components/centers/container/ModifyCenterPage';

const props = {
  center: {
    status: {
      modifying: false
    },
    centerToBeModified: [
      {
        name: 'Modified Center',
        facilities: ['swimming-pool', 'lounge'],
        isAvalilable: true,
        id: '1',
        imageUrl: 'https://image.com',
        type: 'Multipurpose',
        mobileNumber: '08035272406',
        rentalCost: '23000',
        address: '23, Alhaji Bakare street',
        capacity: '1000000'
      }
    ]
  },
  imageChangePrompt: jest.fn(() => {}),
  cancelUpload: jest.fn(() => {}),
  uploadImageAndGetUrl: jest.fn(() => {}),
  modifyCenter: jest.fn(() => {}),
  pauseUpload: jest.fn(() => {}),
  resumeUpload: jest.fn(() => {})
};

const wrapper = mount(<ModifyCenterPage {...props} />);

describe('Modify center page test-suite', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it(`makes center-image-section div
  visible when image upload is paused`, () => {
    wrapper.setProps({
      center: {
        status: {
          uploadImagePaused: false
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ]
      }
    });
    expect(wrapper.find('.center-image').exists()).toBe(true);
  });

  it(`redirects to all centers page when
  center has been modified succesfully`, () => {
    wrapper.setProps({
      center: {
        status: {
          modified: true,
          changeImagePrompted: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ]
      }
    });
    expect(global.historyPath).toEqual('/centers');
  });

  it(`shows progress bar with pause and
  cancel button when uploading image`, () => {
    wrapper.setState({
      imageFile: undefined
    });
    wrapper.find('.upload-btn-m').simulate('click');
    wrapper.setState({
      imageFile: 'New Image'
    });
    wrapper.find('.upload-btn-m').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          uploadingImage: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 25
        }
      }
    });
    expect(wrapper.find('.fa-pause').exists()).toBe(true);
    expect(wrapper.find('.cancel-btn').exists()).toBe(true);
    expect(wrapper.find('.uploadbar-m').exists()).toBe(true);
  });

  it('the resume button is visible when image upload is paused', () => {
    wrapper.find('.fa-pause').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          uploadingImage: true,
          uploadImagePaused: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 35
        }
      }
    });
    expect(wrapper.find('.fa-play').exists()).toBe(true);
    expect(wrapper.props().pauseUpload).toHaveBeenCalled();
  });

  it('the pause button is visible when image upload has been resumed', () => {
    wrapper.find('.fa-play').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          uploadingImage: true,
          uploadImagePaused: false
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 50
        }
      }
    });
    expect(wrapper.find('.fa-pause').exists()).toBe(true);
    expect(wrapper.props().resumeUpload).toHaveBeenCalled();
  });

  it(`the resume button,upload-bar and pause button are
  not visible when the cancel button is clicked`, () => {
    wrapper.find('.cancel-btn').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          uploadingImage: false,
          uploadImagePaused: false
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 35
        }
      }
    });
    expect(wrapper.find('.fa-play').exists()).toBe(false);
    expect(wrapper.find('.fa-pause').exists()).toBe(false);
    expect(wrapper.find('.uploadbar-m').exists()).toBe(false);
    expect(wrapper.props().cancelUpload).toHaveBeenCalled();
  });

  it('saves value from input field in the state', () => {
    wrapper
      .find('.address')
      .simulate('change', { target: { name: 'address', value: '23, alha' } });
    expect(wrapper.state().address).toEqual('23, alha');
  });

  it('renders file input button when change image button is clicked', () => {
    wrapper.find('.add-image-m-btn').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          changeImagePrompted: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: ['swimming-pool', 'lounge'],
            isAvalilable: true,
            id: '1',
            imageUrl: 'https://image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 35
        }
      }
    });
    wrapper
      .find('.imageFile')
      .simulate('change', {
        target: { name: 'imageFile', file: 'large file' }
      });
    expect(wrapper.find('.imageFile').exists()).toBeTruthy();
    expect(wrapper.props().imageChangePrompt).toHaveBeenCalled();
  });

  it('adds facilities', () => {
    wrapper.setProps({
      center: {
        status: {
          changeImagePrompted: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: null,
            isAvalilable: true,
            id: '1',
            imageUrl: 'image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 35,
          imageUrl: 'image.com'
        }
      }
    });
    wrapper.find('.projector').simulate('click');
    wrapper.find('.projector').simulate('click');
    expect(wrapper.state().facilities).toEqual(['projector']);
  });

  it('modifies the center when the modify button is clicked', () => {
    wrapper.find('.btn-save-m').simulate('click');
    wrapper.setProps({
      center: {
        status: {
          changeImagePrompted: true
        },
        centerToBeModified: [
          {
            name: 'Modified Center',
            facilities: null,
            isAvalilable: true,
            id: '1',
            imageUrl: 'image.com',
            type: 'Multipurpose',
            mobileNumber: '08035272406',
            rentalCost: '23000',
            address: '23, Alhaji Bakare street',
            capacity: '1000000'
          }
        ],
        imageUpload: {
          uploadProgress: 35
        }
      }
    });
    wrapper.find('.btn-save-m').simulate('click');
    wrapper.unmount();
  });
});
