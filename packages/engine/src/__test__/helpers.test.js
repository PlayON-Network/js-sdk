import PlayonNetworkEngine from "../engine.js";
import globalJsdom from "jsdom-global";
import PlayonNetworkApp from "../app.js";
import sinon from "sinon";

export function spyEventOnElement(elem, eventType) {
    const callback = sinon.spy();
    elem.addEventListener(eventType, callback);

    return callback;
}

export async function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}

/**
 * @package
 * @param {string} name
 * @param {string} authToken
 * @return {Promise<PlayonNetworkApp>}
 */
export async function createApp(name, authToken) {
    const engine = await createLoadedEngine({authToken});

    return PlayonNetworkApp.getInstance(
        name,
        () => new PlayonNetworkApp(engine),
    );
}

export async function createLoadedEngine({authToken, isStandalone = false}) {
    const engine = new PlayonNetworkEngine({
        nid: 'testing',
        authToken: authToken,
        isStandalone: isStandalone,
    });

    const promise = engine.load();
    document.head.querySelector('script').dispatchEvent(new ErrorEvent('load'));

    return promise;
}

export function initializeDOM() {
    this.jsdom = globalJsdom(
        `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body><div id="playon-network-app"></div></body>
        </html>
        `,
        {
            url: "https://www.example.com/",
            referrer: "https://www.example.com/",
            contentType: "text/html",
        },
    );
}

export function resetDOM() {
    this.jsdom();
}