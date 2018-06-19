import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UploadProgressbar, LoadingIcon, SpinnerProgressBar, LargeLoadingIcon } from '../../components/utils/LoaderComponents';

const firstWrapper = shallow(<UploadProgressbar />);
const secondWrapper = shallow(<LoadingIcon />);
const thirdWrapper = shallow(<SpinnerProgressBar />);
const fourthWrapper = shallow(<LargeLoadingIcon />);

describe('unauthenticated HOC', () => {
  it('mounts centercard component', () => {
    expect(firstWrapper.exists()).toBe(true);
    expect(secondWrapper.exists()).toBe(true);
  });
});
