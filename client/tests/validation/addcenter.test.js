import expect from 'expect';
import {
  checkInvalidPrimaryCenterDetails,
  checkInvalidRentalCostAndFacilities
} from '../../validations/addcenter.validate';

describe('add center validation tests', () => {
  it(`returns array of error messages
  for invalid, null or error inputs`, () => {
    const inputs = {
      name: 'Efosa',
      type: '',
      capacity: '2300uujuj',
      mobileNumber: '0803525hg',
      address: undefined
    };
    expect(Array.isArray(checkInvalidPrimaryCenterDetails(inputs)))
      .toBeTruthy();
  });
  it(`returns array of error messages for
  invalid, null or error inputs`, () => {
    const inputs = {
      name: 'Efosa',
      type: '',
      capacity: 'uujuj',
      mobileNumber: 'uuuuu'
    };
    expect(Array.isArray(checkInvalidPrimaryCenterDetails(inputs)))
      .toBeTruthy();
  });
  it('returns true if values are valid', () => {
    const inputs = {
      name: 'Efosa',
      type: 'seminar',
      capacity: '2300000',
      mobileNumber: '08035272406',
      address: '23, AlhajiBakare street'
    };
    expect(checkInvalidPrimaryCenterDetails(inputs)).toBeTruthy();
  });
  it('returns array of error messages if a required input is undefined', () => {
    const rentalCostAndFacilities = {};
    expect(Array
      .isArray(checkInvalidRentalCostAndFacilities(rentalCostAndFacilities)))
      .toBeTruthy();
  });
  it('returns array of error message if rentalCost is alphanumeric', () => {
    const rentalCostAndFacilities = {
      rentalCost: '080jdgfdje'
    };
    expect(Array
      .isArray(checkInvalidRentalCostAndFacilities(rentalCostAndFacilities)))
      .toBeTruthy();
  });
  it('returns array of error message if rentalCost is alphabets', () => {
    const rentalCostAndFacilities = {
      rentalCost: 'jdgfdje'
    };
    expect(Array
      .isArray(checkInvalidRentalCostAndFacilities(rentalCostAndFacilities)))
      .toBeTruthy();
  });
  it(`returns array of error message if
  rentalCost contains only spaces`, () => {
    const rentalCostAndFacilities = {
      rentalCost: '   '
    };
    expect(Array
      .isArray(checkInvalidRentalCostAndFacilities(rentalCostAndFacilities)))
      .toBeTruthy();
  });
  it('returns true if inputs are valid', () => {
    const rentalCostAndFacilities = {
      rentalCost: '230000',
      facilities: ['swimming-pool', 'lounge']
    };
    expect(checkInvalidRentalCostAndFacilities(rentalCostAndFacilities))
      .toBeTruthy();
  });
});
