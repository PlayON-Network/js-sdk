import defaults from './defaults.js';
import { expect } from 'chai';

describe('Fill an Object with default values', () => {
  let defaultValues;

  beforeEach(() => {
    defaultValues = {
      id: 'operator_id',
      al: true,
      s: '#testing_selector',
    };
  });

  it('Filling only undefined properties', () => {
    const object = defaults({
      id: 'other_operator_id',
      s: null,
    }, defaultValues);

    expect(object).to.be.deep.equal({
      id: 'other_operator_id',
      al: true,
      s: null,
    });
  });
});