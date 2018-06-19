import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import centerMockData from '../__mocks__/centerMockData';
import { imageChangePrompt } from '../../actions/centerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('upload image related actions', () => {
  describe('tests for center image upload actions', () => {
    it('creates IMAGE_CHANGE_PROMPT on image upload prompt ', async (done) => {
      const returnedActions = [
        {
          type: 'IMAGE_CHANGE_PROMPT',
        },
      ];
      const store = mockStore({});
      await store.dispatch(imageChangePrompt(centerMockData.ImageFile));
      expect(store.getActions()).toEqual(returnedActions);
      done();
    });
  });
});
