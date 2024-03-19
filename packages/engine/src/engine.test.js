import PlayonNetworkEngine from './engine.js';
import { expect } from 'chai';
import {
    PlayonNetworkAttestationTokenRequiredException,
    PlayonNetworkAuthTokenRequiredException,
    PlayonNetworkEngineNotInitializedException,
    PlayonNetworkNidRequiredException,
    PlayonNetworkPathWrongFormattedException,
    PlayonNetworkUnableToLoadEngineException,
} from "./exception.js";
import {initializeEngine} from "./main.js";
import {initializeDOM, resetDOM} from "./__test__/helpers.test.js";

const _kAuthToken = '<some-auth-token-here>';
const _kAttestationToken = '<some-attestation-token-here>';

describe('PlayonNetworkEngine', () => {
    beforeEach(initializeDOM);
    afterEach(resetDOM);

    describe('constructor', () => {
        it('throws an exception when the Network ID is missing.', () => {
            // noinspection JSCheckFunctionSignatures
            expect(
                () => new PlayonNetworkEngine()
            ).to.throw(PlayonNetworkNidRequiredException);
        });

        it('throws an exception when the Auth Token is missing.', () => {
            // noinspection JSCheckFunctionSignatures
            expect(
                () => new PlayonNetworkEngine({nid: 'testing'})
            ).to.throw(PlayonNetworkAuthTokenRequiredException);
        });

        it('throws an exception when the Attestation Token is missing.', () => {
            expect(() => new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                isTesting: true,
            })).to.throw(PlayonNetworkAttestationTokenRequiredException);
        });

        it('throws an exception when the Path is not well formatted.', () => {
            expect(() => new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                path: 'wrong-path',
            })).to.throw(PlayonNetworkPathWrongFormattedException);
        });

        it('initializes FIREBASE_APPCHECK_DEBUG_TOKEN correctly.', () => {
            new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                isTesting: true,
                attestationToken: _kAttestationToken,
            });

            expect(self.FIREBASE_APPCHECK_DEBUG_TOKEN).to.be.equals(_kAttestationToken);
        });
    });

    describe('instance', () => {
        it('throws an exception when you try to use it before initialize the engine.', () => {
            expect(() => PlayonNetworkEngine.instance).to.throw(PlayonNetworkEngineNotInitializedException);
        });

        it('returns a PlayonNetworkEngine object.', () => {
            initializeEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            });

            expect(PlayonNetworkEngine.instance).to.be.a.instanceOf(PlayonNetworkEngine);
        });
    });

    describe('baseUrl', () => {
        it('points to a production PLAYON Network URL.', () => {
            expect(new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            })).to.have.property('baseUrl', 'https://www.playon.network/app/testing/');
        });

        it('points to a staging PLAYON Network URL.', () => {
            expect(new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                isTesting: true,
                attestationToken: _kAttestationToken,
            })).to.have.property('baseUrl', 'https://staging.playon.network/app/testing/');
        });

        it('points to window.location when is standalone.', () => {
            expect(new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                isStandalone: true,
            })).to.have.property('baseUrl', 'https://www.example.com/app/');
        });

        it('points to window.location with custom path when is standalone.', () => {
            expect(new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
                isStandalone: true,
                path: '/my-app/'
            })).to.have.property('baseUrl', 'https://www.example.com/my-app/');
        });
    });

    describe('load', () => {
        describe('adds a script to load the engine into the DOM', () => {
            it('pointing to the PLAYON Network production environment', () => {
                const engine = new PlayonNetworkEngine({
                    nid: 'testing',
                    authToken: _kAuthToken,
                });

                engine.load();

                expect(document.head.querySelector('script')).to.have.property(
                    'src',
                    'https://www.playon.network/app/testing/engine.js',
                );
            });

            it('pointing to the PLAYON Network staging environment', () => {
                const engine = new PlayonNetworkEngine({
                    nid: 'testing',
                    authToken: _kAuthToken,
                    isTesting: true,
                    attestationToken: _kAttestationToken,
                });

                engine.load();

                expect(document.head.querySelector('script')).to.have.property(
                    'src',
                    'https://staging.playon.network/app/testing/engine.js',
                );
            });

            it('pointing to a standalone location', () => {
                const engine = new PlayonNetworkEngine({
                    nid: 'testing',
                    authToken: _kAuthToken,
                    isStandalone: true,
                });

                engine.load();

                expect(document.head.querySelector('script')).to.have.property(
                    'src',
                    'https://www.example.com/app/engine.js',
                );
            });

            it('pointing to a standalone location, even in testing mode.', () => {
                const engine = new PlayonNetworkEngine({
                    nid: 'testing',
                    authToken: _kAuthToken,
                    isStandalone: true,
                    isTesting: true,
                    attestationToken: _kAttestationToken,
                });

                engine.load();

                expect(document.head.querySelector('script')).to.have.property(
                    'src',
                    'https://www.example.com/app/engine.js',
                );
            });
        });

        it('throws an exception when the engine script fails to load.', () => {
            const engine = new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            });

            const promise = engine.load();

            promise.catch((ex) => expect(ex).to.be.an.instanceof(PlayonNetworkUnableToLoadEngineException));

            document.head.querySelector('script').dispatchEvent(new ErrorEvent('error'));
        });

        it('eventually resolves and sets the engine as loaded and ready to use.', () => {
            const engine = new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            });

            engine.load();
            document.head.querySelector('script').dispatchEvent(new ErrorEvent('load'));

            expect(engine).to.have.property('isLoaded', true);
        });

        it('only loads the engine once and returns itself in next calls.', async () => {
            const engine = new PlayonNetworkEngine({
                nid: 'testing',
                authToken: _kAuthToken,
            });

            const promise = engine.load();
            expect(promise).to.be.a('promise');

            document.head.querySelector('script').dispatchEvent(new ErrorEvent('load'));

            expect(await engine.load()).to.be.instanceOf(PlayonNetworkEngine);
            expect(await engine.load()).to.be.equals(engine);
        });
    });
});