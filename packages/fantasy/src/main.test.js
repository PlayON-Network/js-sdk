import { initializeFantasyApp } from './main.js';
import { expect } from 'chai';

describe('Test initializeFantasyApp function', () => {
  it('The module exports the function correctly', () => {
    expect(initializeFantasyApp).to.be.a('function');
  });
});