/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kNidRequiredCode = 101;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kAuthTokenRequiredCode = 102;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kAttestationTokenRequiredCode = 103;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kPathWrongFormattedCode = 104;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kEngineNotInitializedCode = 105;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kEngineNotLoadedCode = 106;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kUnableToLoadEngineCode = 107;

/**
 * @package
 * @type {number}
 * @since 1.1.0
 */
const kApplicationNotInitializedCode = 201;

/**
 * @abstract
 * @package
 * @since 1.1.0
 */
class PlayonNetworkException extends Error {
    constructor(name, message, code) {
        super(message);

        this.code = code;
        this.name = name;
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkNidRequiredException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkNidRequiredException',
            'Your Playon Network ID is required.',
            kNidRequiredCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkAuthTokenRequiredException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkAuthTokenRequiredException',
            'An Auth Token is required.',
            kAuthTokenRequiredCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkAttestationTokenRequiredException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkAttestationTokenRequiredException',
            'An Attestation Token is required in testing mode.',
            kAttestationTokenRequiredCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkPathWrongFormattedException extends PlayonNetworkException {
    constructor(path) {
        super(
            'PlayonNetworkPathWrongFormattedException',
            `Your path ${path} is not well formatted. It must start and end with a forward slash.`,
            kPathWrongFormattedCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkEngineNotInitializedException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkEngineNotInitializedException',
            'You must initialize the PLAYON Network Engine before use it.',
            kEngineNotInitializedCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkEngineNotLoadedException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkEngineNotLoadedException',
            'You must load the PLAYON Network Engine before use it with a PLAYON Network application.',
            kEngineNotLoadedCode,
        );
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkUnableToLoadEngineException extends PlayonNetworkException {
    constructor(originalError) {
        super(
            'PlayonNetworkUnableToLoadEngineException',
            'The PLAYON Network Engine script load has failed unexpectedly.',
            kUnableToLoadEngineCode,
        );

        // TODO - Use this originalError in the toString method?
        this.originalError = originalError;
    }
}

/**
 * @public
 * @since 1.1.0
 */
export class PlayonNetworkApplicationNotInitializedException extends PlayonNetworkException {
    constructor() {
        super(
            'PlayonNetworkApplicationNotInitializedException',
            'You must initialize the PLAYON Network Application before use it.',
            kApplicationNotInitializedCode,
        );
    }
}