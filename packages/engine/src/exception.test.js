import {
  PlayonNetworkAuthTokenRequiredException,
  PlayonNetworkNidRequiredException,
  PlayonNetworkAttestationTokenRequiredException,
  PlayonNetworkPathWrongFormattedException,
  PlayonNetworkEngineNotInitializedException,
  PlayonNetworkUnableToLoadEngineException,
  PlayonNetworkEngineNotLoadedException, PlayonNetworkApplicationNotInitializedException,
} from './exception.js';
import { expect } from 'chai';

describe('Test the Playon Network Exception system', () => {
  it('Test the PlayonNetworkNidRequired exception class', () => {
    const error = new PlayonNetworkNidRequiredException();

    expect(error).to.have.property('name', 'PlayonNetworkNidRequiredException');
    expect(error).to.have.property('code', 101);
    expect(error).to.have.property('message', 'Your Playon Network ID is required.');
  });

  it('Test the PlayonNetworkAuthTokenRequired exception class', () => {
    const error = new PlayonNetworkAuthTokenRequiredException();

    expect(error).to.have.property('name', 'PlayonNetworkAuthTokenRequiredException');
    expect(error).to.have.property('code', 102);
    expect(error).to.have.property('message', 'An Auth Token is required.');
  });

  it('Test the PlayonNetworkAttestationTokenRequired exception class', () => {
    const error = new PlayonNetworkAttestationTokenRequiredException();

    expect(error).to.have.property('name', 'PlayonNetworkAttestationTokenRequiredException');
    expect(error).to.have.property('code', 103);
    expect(error).to.have.property('message', 'An Attestation Token is required in testing mode.');
  });

  it('Test the PlayonNetworkPathWrongFormattedCodeException exception class', () => {
    const path = 'wrong-path';
    const error = new PlayonNetworkPathWrongFormattedException(path);

    expect(error).to.have.property('name', 'PlayonNetworkPathWrongFormattedException');
    expect(error).to.have.property('code', 104);
    expect(error).to.have.property('message', `Your path ${path} is not well formatted. It must start and end with a forward slash.`);
  });

  it('Test the PlayonNetworkEngineNotInitializedException exception class', () => {
    const error = new PlayonNetworkEngineNotInitializedException();

    expect(error).to.have.property('name', 'PlayonNetworkEngineNotInitializedException');
    expect(error).to.have.property('code', 105);
    expect(error).to.have.property('message', 'You must initialize the PLAYON Network Engine before use it.');
  });

  it('Test the PlayonNetworkEngineNotLoadedException exception class', () => {
    const error = new PlayonNetworkEngineNotLoadedException();

    expect(error).to.have.property('name', 'PlayonNetworkEngineNotLoadedException');
    expect(error).to.have.property('code', 106);
    expect(error).to.have.property('message', 'You must load the PLAYON Network Engine before use it with a PLAYON Network application.');
  });

  it('Test the PlayonNetworkUnableToLoadEngineException exception class', () => {
    const error = new PlayonNetworkUnableToLoadEngineException();

    expect(error).to.have.property('name', 'PlayonNetworkUnableToLoadEngineException');
    expect(error).to.have.property('code', 107);
    expect(error).to.have.property('message', 'The PLAYON Network Engine script load has failed unexpectedly.');
  });

  it('Test the PlayonNetworkApplicationNotInitializedException exception class', () => {
    const error = new PlayonNetworkApplicationNotInitializedException();

    expect(error).to.have.property('name', 'PlayonNetworkApplicationNotInitializedException');
    expect(error).to.have.property('code', 201);
    expect(error).to.have.property('message', 'You must initialize the PLAYON Network Application before use it.');
  });
});
