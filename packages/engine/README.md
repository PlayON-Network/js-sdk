# @playon-network/engine

This is the PlayON Network Engine component of the PlayON Network JS SDK.

## Installation

```bash
$ npm install --save @playon-network/engine
$ npm install --save @playon-network/fantasy
```

## Get Started

```js
// Import the functions you need from the packages you need.
import { initializeEngine } from '@playon-network/engine';
import { initializeFantasyApp } from '@playon-network/fantasy';

/**
 * Your web app's PLAYON Network configuration.
 *
 * isTesting is optional, by default is false.
 * To use the staging environment of your application in the PlayON Network,
 * set the isTesting option to true.
 *
 * When running your host application in a locahost environment, you must provide
 * your attestation token to be able to use the application in the PlayON Network
 * in such environment. The attestation token never must be public.
 *
 * @see {@link EngineOptions#attestationToken} for more information.
 */
const config = {
    isTesting: true,
    nid: '<playon-network-username>',
    authToken: '<auth-token>',
    attestationToken: '<attestation-token>',
    onAuthTokenError: (errorCode) => {
        return new Promise((resolve) => {
            const authToken = '<your-new-issued-auth-token>';
            resolve(authToken);
        });
    },
    onRequestAddFunds: (amount) => {
        return new Promise((resolve) => {
            const funded = true; // or false if the user didn't fund their wallet.
            resolve(funded);
        });
    },
};

// Before start the application, you need to initialize the Engine.
const engine = await initializeEngine(config);

// Fetch the DOM element where you want to place the application.
const elem = document.querySelector('#fantasy_app');

// Once the Engine is ready, create and initialize the application that you want to use.
initializeFantasyApp(engine, elem);
```
