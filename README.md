# PlayON Network Javascript SDK

The PlayON Network JavaScript SDK implements the client-side libraries used by
applications using PlayON Network services. This SDK is distributed via:

- [CDN]() # TODO
- [npm package]() # TODO

## Get Started

```js
// Import the functions you need from the packages you need.
import { initializeEngine } from '@playon-network/engine';
import { initializeFantasyApp } from '@playon-network/fantasy';

// Your web app's PlayON Network configuration.
//
// isTesting is optional, by default is false.
// To use the staging environment of your application in the PlayON Network,
// set the isTesting option to true.
const config = {
  nid: '<playon-network-identifier>',
  authToken: '<auth-token>',
  isTesting: true,
};

// Before start the application, you need to initialize the Engine.
const engine = await initializeEngine(config);

// Fetch the DOM element where you want to place the application.
const elem = document.querySelector('#fantasy_app');

// Once the Engine is ready, create and initialize the application you want to use.
initializeFantasyApp(engine, elem);
```
