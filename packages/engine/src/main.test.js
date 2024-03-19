import { initializeEngine } from './main.js';
import { expect } from 'chai';

describe('Test initializeEngine function', () => {
  it('The module exports the function correctly', () => {
    expect(initializeEngine).to.be.a('function');
  });

  it ('The function returns a promise', () => {
    expect(initializeEngine({
      nid: 'testing',
      authToken: '<some-auth-token-here>',
    })).to.be.a('promise');
  });
});
