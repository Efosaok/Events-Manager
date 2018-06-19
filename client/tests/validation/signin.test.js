import expect from 'expect';
import signinValidator from '../../validations/signin.validate';

describe('signup validator', () => {
  it('returns an array of error message if details are invalid', () => {
    const inputs = {
      email: 'efosa.com',
      password: 'swam',
    };
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message details are undefined', () => {
    const inputs = {};
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message if details are empty', () => {
    const inputs = {
      password: '   ',
      email: ''
    };
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns true if details are valid', () => {
    const inputs = {
      email: 'efosa@gm.com',
      password: 'radiousfr',
    };
    expect(signinValidator(inputs)).toBeTruthy();
  });
});
