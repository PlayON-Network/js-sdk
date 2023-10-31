import parseQuery from './parseQuery.js';
import { expect } from 'chai';

describe('Parse an URL query into a JS object', () => {
  it('Common query', () => {
    const query = parseQuery('id=operator_id&al=true&s=#testing_selector');

    expect(query).to.be.deep.equal({
      id: 'operator_id',
      al: true,
      s: '#testing_selector',
    });
  });

  it('Empty query', () => {
    expect(parseQuery()).to.be.deep.equal({});
    expect(parseQuery(null)).to.be.deep.equal({});
    expect(parseQuery('')).to.be.deep.equal({});
  });

  it('Query with URI encoded chars', () => {
    const query = parseQuery('id=operator_id&al=true&s=%23testing_selector');

    expect(query).to.be.deep.equal({
      id: 'operator_id',
      al: true,
      s: '#testing_selector',
    });
  });
  
  it('Query with a false parameter', () => {
    const query = parseQuery('id=operator_id&al=false');

    expect(query).to.be.deep.equal({
      id: 'operator_id',
      al: false,
    });
  });

  it('Query with a parameter without explicit value', () => {
    const query = parseQuery('id=operator_id&al');

    expect(query).to.be.deep.equal({
      id: 'operator_id',
      al: true,
    });
  });
  
  it('Query with a numerical parameter', () => {
    const query = parseQuery('id=operator_id&num=23');

    expect(query).to.be.deep.equal({
      id: 'operator_id',
      num: 23,
    });
  });
});
