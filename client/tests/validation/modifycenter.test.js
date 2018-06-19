import expect from 'expect';
import checkInvalidModifyCenterDetails
  from '../../validations/modifycenter.validate';

describe('add center validation tests', () => {
  it(`returns array of error messages for invalid,
  null or error inputs`, () => {
    const inputs = {
      name: 'Efosa',
      type: '    ',
      capacity: '2300uujuj',
      mobileNumber: '0803525hg',
      address: undefined
    };
    expect(Array.isArray(checkInvalidModifyCenterDetails(inputs))).toBeTruthy();
  });
  it('returns array of error messages if type is empty', () => {
    const inputs = {
      name: 'Efosa',
      type: '      ',
      capacity: 'uujuj',
      mobileNumber: 'uuuuu'
    };
    expect(Array.isArray(checkInvalidModifyCenterDetails(inputs))).toBeTruthy();
  });
  it(`returns true if
  values are valid`, () => {
    const inputs = {
      name: 'Efosa',
      type: 'seminar',
      capacity: '2300000',
      mobileNumber: '08035272406',
      address: '23, AlhajiBakare street'
    };
    expect(checkInvalidModifyCenterDetails(inputs)).toBeTruthy();
  });
});
