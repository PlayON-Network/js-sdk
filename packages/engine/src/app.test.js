import PlayonNetworkApp from './app.js';
import chai, { expect } from 'chai';
import PlayonNetworkEngine from "./engine.js";
import {
    PlayonNetworkApplicationNotInitializedException,
    PlayonNetworkEngineNotLoadedException,
} from "./exception.js";
import {
    createApp,
    createLoadedEngine,
    initializeDOM,
    resetDOM,
    spyEventOnElement,
    wait
} from "./__test__/helpers.test.js";
import FlutterMock from "./__test__/flutter.test.js";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import PlayonNetworkEventType from "./event-types.js";

const _kAuthToken = '<some-auth-token-here>';

chai.use(sinonChai);

describe('PlayonNetworkApp', () => {
    beforeEach(initializeDOM);
    beforeEach(() => global._flutter = new FlutterMock());
    afterEach(resetDOM);
    afterEach(() => sinon.restore());
    afterEach(() => PlayonNetworkApp._instances = {}); // Restore applications.

    describe('constructor', () => {
        it('throws an exception when the PLAYON Network Engine is not loaded.', () => {
            const engine = new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            });

            expect(() => new PlayonNetworkApp(engine)).to.throw(PlayonNetworkEngineNotLoadedException);
        });

        it('creates a Playon Network App with defaults options.', async () => {
            const engine = await createLoadedEngine({authToken: _kAuthToken});
            const app = new PlayonNetworkApp(engine);

            expect(app._config).to.have.property('serviceWorkerVersion', null);
            expect(app._config).to.have.property('entrypoint', 'app.js');
        });

        it('creates a Playon Network App with an optional and private AppOptions object', async () => {
            const engine = await createLoadedEngine({authToken: _kAuthToken});
            const appConfig = {
                serviceWorkerVersion: '99.99.99',
                entrypoint: 'custom-entrypoint.js'
            };

            const app = new PlayonNetworkApp(engine, appConfig);

            expect(app._config).to.have.property('serviceWorkerVersion', appConfig.serviceWorkerVersion);
            expect(app._config).to.have.property('entrypoint', appConfig.entrypoint);
        });
    });

    describe('getInstance', () => {
        it('throws an exception when the application is not initialized and an initializer parameter is not supplied.', async () => {
            expect(() => PlayonNetworkApp.getInstance('app')).to.throw(PlayonNetworkApplicationNotInitializedException);
        });

        it('initializes and returns a PLAYON Network Application with the \'foo\' name.', async () => {
            const app = await createApp('foo', _kAuthToken);
            expect(app).to.be.a.instanceOf(PlayonNetworkApp);
        });

        it('returns a PLAYON Network Application with the \'foo\' name previously initialized.',  async () => {
            await createApp('foo', _kAuthToken);
            const app = PlayonNetworkApp.getInstance('foo');

            expect(app).to.be.a.instanceOf(PlayonNetworkApp);
        });
    });

    describe('load', () => {
        it('starts the application inside the DOM element supplied', async () => {
            const elem = document.getElementById('playon-network-app');
            const loadingCallback = spyEventOnElement(elem, PlayonNetworkEventType.loading);
            const loadedCallback = spyEventOnElement(elem, PlayonNetworkEventType.loaded);
            const startingCallback = spyEventOnElement(elem, PlayonNetworkEventType.starting);
            const startedCallback = spyEventOnElement(elem, PlayonNetworkEventType.started);
            const app = await createApp('foo', _kAuthToken);

            app.load(elem);

            await wait(5);

            expect(loadingCallback).to.be.calledOnce;
            expect(loadedCallback).to.be.calledOnce;
            expect(startingCallback).to.be.calledOnce;
            expect(startedCallback).to.be.calledOnce;
        });

        it('starts the application inside the DOM element supplied as string', async () => {
            const elem = document.getElementById('playon-network-app');
            const loadingCallback = spyEventOnElement(elem, PlayonNetworkEventType.loading);
            const loadedCallback = spyEventOnElement(elem, PlayonNetworkEventType.loaded);
            const startingCallback = spyEventOnElement(elem, PlayonNetworkEventType.starting);
            const startedCallback = spyEventOnElement(elem, PlayonNetworkEventType.started);
            const app = await createApp('foo', _kAuthToken);

            app.load('#playon-network-app');

            await wait(5);

            expect(loadingCallback).to.be.calledOnce;
            expect(loadedCallback).to.be.calledOnce;
            expect(startingCallback).to.be.calledOnce;
            expect(startedCallback).to.be.calledOnce;
        });

        it('starts the application in the whole window when no element is supplied.',  async () => {
            const loadingCallback = spyEventOnElement(window, PlayonNetworkEventType.loading);
            const loadedCallback = spyEventOnElement(window, PlayonNetworkEventType.loaded);
            const startingCallback = spyEventOnElement(window, PlayonNetworkEventType.starting);
            const startedCallback = spyEventOnElement(window, PlayonNetworkEventType.started);
            const app = await createApp('foo', _kAuthToken);

            app.load();

            await wait(5);

            expect(loadingCallback).to.be.calledOnce;
            expect(loadedCallback).to.be.calledOnce;
            expect(startingCallback).to.be.calledOnce;
            expect(startedCallback).to.be.calledOnce;
        });

        it('starts the application using the private custom config.', async () => {
            const engine = await createLoadedEngine({
                authToken: _kAuthToken,
                isStandalone: true,
            });

            const app = PlayonNetworkApp.getInstance(
                'foo',
                () => new PlayonNetworkApp(engine, {
                    serviceWorkerVersion: '9.0.9',
                    entrypoint: 'custom-entrypoint.js',
                }),
            );

            app.load();

            expect(_flutter.loader.options.serviceWorker).to.have.property('serviceWorkerVersion', '9.0.9');
            expect(_flutter.loader.options).to.have.property(
                'entrypointUrl',
                'https://www.example.com/app/custom-entrypoint.js',
            );
        });

        it('sends the loading and loaded events to the DOM element only once.',  async () => {
            const loadingCallback = spyEventOnElement(window, PlayonNetworkEventType.loading);
            const loadedCallback = spyEventOnElement(window, PlayonNetworkEventType.loaded);
            const app = await createApp('foo', _kAuthToken);

            app.load();
            await wait(5);
            app.load();
            await wait(5);
            app.load();
            await wait(5);

            expect(loadingCallback).to.be.calledOnce;
            expect(loadedCallback).to.be.calledOnce;
        });

        it('sends the starting and started events to the DOM element every time is called.',  async () => {
            const startingCallback = spyEventOnElement(window, PlayonNetworkEventType.starting);
            const startedCallback = spyEventOnElement(window, PlayonNetworkEventType.started);
            const app = await createApp('foo', _kAuthToken);

            app.load();
            await wait(5);
            app.load();
            await wait(5);
            app.load();
            await wait(5);

            expect(startingCallback).to.be.calledThrice;
            expect(startedCallback).to.be.calledThrice;
        });
    });
});