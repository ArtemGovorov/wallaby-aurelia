// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/b6e562cdacae8fdbce2c972daa109195435b8f32/i18next-browser-languagedetector/i18next-browser-languagedetector.d.ts
declare namespace I18next {
    interface I18nextStatic extends i18nextBrowserLanguageDetector.I18nextStatic { }
    interface I18nextOptions extends i18nextBrowserLanguageDetector.I18nextOptions { }
}

declare namespace i18nextBrowserLanguageDetector {
    /**
     * @summary Interface for Language detector options.
     * @interface
     */
    interface LanguageDetectorOptions {
        caches?: Array<string>|boolean;
        cookieDomain?: string;
        cookieExpirationDate?: Date;
        lookupCookie?: string;
        lookupFromPathIndex?: number;
        lookupQuerystring?: string;
        lookupSession?: string;
        order?: Array<string>;
    }

    /**
     * @summary Interface for custom detector.
     * @interface
     */
    interface CustomDetector {
        name: string;

        //todo: Checks paramters type.
        cacheUserLanguage: (lng: string, options: Object) => void;
        lookup: (options: Object) => string;
    }

    /**
     * @summary i18next options.
     * @interface
     */
    interface I18nextOptions {
        detection?: LanguageDetectorOptions;
    }

    /**
     * @summary i18next interface.
     * @interface
     */
    interface I18nextStatic {
        use(module: LngDetector): I18nextStatic;
    }

    /**
     * @summary i18next language detection.
     * @class
     */
    class LngDetector {
        /**
         * @summary Constructor.
         * @constructor
         */
        constructor(services?: any, options?: LanguageDetectorOptions);

        /**
         * @summary Adds detector.
         * @param {CustomDetector} detector The custom detector.
         */
        addDetector(detector: CustomDetector): LngDetector;

        /**
         * @summary Initializes detector.
         * @param {LanguageDetectorOptions} options The options.
         */
        init(options?: LanguageDetectorOptions): void;
    }
}

declare module "i18next-browser-languagedetector" {

    export default i18nextBrowserLanguageDetector.LngDetector;
}
