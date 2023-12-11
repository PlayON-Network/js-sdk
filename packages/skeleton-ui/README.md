# @playon-network/skeleton-ui

This is the PlayON Network Fantasy component of the PlayON Network JS SDK.

## Installation

```bash
$ npm install --save @playon-network/engine
$ npm install --save @playon-network/fantasy
$ npm install --save @playon-network/skeleton-ui
```

## Get Started

```js
// Import the functions you need from the packages you need.
import { initializeEngine } from '@playon-network/engine';
import { initializeFantasyApp } from '@playon-network/fantasy';
import { initializeFantasySkeleton } from '@playon-network/skeleton-iu';

// Initialize the skeleton UI as soon as possible so it can be used in your templates.
initializeFantasySkeleton();

// Your web app's PlayON Network configuration.
//
// isTesting is optional, by default is false.
//
// To use the staging environment of your application in the PlayON Network,
// set the isTesting option to true and provide your attestation token.
const config = {
    nid: '<playon-network-identifier>',
    authToken: '<auth-token>',
    attestationToken: '<attestation-token>',
    isTesting: true,
};

// Before start the application, you need to initialize the Engine.
const engine = await initializeEngine(config);

// Fetch the DOM element where you want to place the application.
const elem = document.querySelector('#fantasy_app');

// Once the Engine is ready, create and initialize the application you want to use.
initializeFantasyApp(engine, elem);
```

```html
<!-- Now, in your HTML template file, you can use the skeleton component -->
<po-fantasy-skeleton></po-fantasy-skeleton>
```

```css
/* And finally, you can customize it with the next CSS variables */
po-fantasy-skeleton {
    --skeleton-color: black;
    --item-color: turquoise;
    --background-color: yellow;
    --drawer-color: red;
    --drawer-divider-color: magenta;
    --drawer-border-color: black;
    --app-bar-button-color: blue;
    --app-bar-event-selector-color: orange;
    --app-bar-color: red;
    --app-bar-border-color: black;
    --secondary-app-bar-color: green;
}
```