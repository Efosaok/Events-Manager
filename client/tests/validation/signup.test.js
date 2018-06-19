import expect from 'expect';
import signupValidator from '../../validations/signup.validate';

describe('signup validator', () => {
  it('returns an array of error message ifsome field are empty', () => {
    const inputs = {
      firstname: 'John',
      lastname: '    ',
      email: 'efosa.com',
      password: 'swam',
      confirmpassword: 'swamp'
    };
    expect(Array.isArray(signupValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message if email is invalid', () => {
    const inputs = {
      firstname: '5678909876567',
      email: 'efosa.com',
      password: 'swam',
      confirmpassword: 'swamp'
    };
    expect(Array.isArray(signupValidator(inputs))).toBeTruthy();
  });
  it('returns true if details are valid', () => {
    const inputs = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'efosa@gm.com',
      password: 'swampious',
      confirmpassword: 'swampious',
    };
    expect(signupValidator(inputs)).toBeTruthy();
  });
});
