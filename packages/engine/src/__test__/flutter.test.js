import PlayonNetworkEventType from "../event-types.js";

class FlutterAppRunnerMock {
    runApp() {
        window.dispatchEvent(new Event(PlayonNetworkEventType.rendered));
        return Promise.resolve();
    }
}

class FlutterEngineInitializerMock {
    initializeEngine(options) {
        this.options = options;

        return new FlutterAppRunnerMock();
    }
}

class FlutterLoaderMock {
    loadEntrypoint(options) {
        this.options = options;
        this.options.onEntrypointLoaded(new FlutterEngineInitializerMock());
    }
}

export default class FlutterMock {
    constructor() {
        this.loader = new FlutterLoaderMock();
    }
}