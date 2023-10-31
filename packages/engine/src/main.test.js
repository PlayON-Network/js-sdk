import { initializeEngine } from './main.js';
import { expect } from 'chai';

describe('Test initializeEngine function', () => {
  it('The module exports the function correctly', () => {
    expect(initializeEngine).to.be.a('function');
  });
});