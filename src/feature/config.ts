import { HttpError } from './helpers.js';

/** i18n object for internationalization. */
export const i18n = {
  /** Supported language codes. */
  supported: ['en', 'es', 'fr', 'nl'],
  /** Regular expression pattern for language code validation. */
  pattern: /^[a-z]{2}(?:-[A-Z]{2})?$/,
  url: {
    /** Provider's URL. */
    hostname: 'https://libretranslate.com',
    /**
     * Provider's URL paths.
     *
     * @see https://libretranslate.com/docs
     */
    paths: {
      /**
       * @see https://libretranslate.com/docs/#/translate/post_translate
       */
      translate: '/translate',
      /**
       * @see https://libretranslate.com/docs/#/translate/get_languages
       */
      languages: '/languages',
    },
  },
};

/** Validators for common validation functions. */
export const validators = {
  /**
   * Validator if the {@code text} parameter.
   *
   * @param {string} t - The text to validate.
   * @returns {boolean} Returns {@code true} if valid, {@code false} otherwise.
   */
  text: (t: string): void => {
    if (t === null || t === undefined)
      throw new HttpError(400, "'text'  parameter is required.");
    if (t === '') throw new HttpError(400, "'text'  parameter is in blank.");
  },
  /**
   * Validator if the language code parameters.
   *
   * @param {string} t - The text to validate.
   * @returns {boolean} Returns {@code true} if valid, {@code false} otherwise.
   */
  lang: (t: string, name: string): void => {
    if (t === null || t === undefined)
      throw new HttpError(400, `'${name}'  parameter is required.`);
    if (!i18n.pattern.test(t))
      throw new HttpError(400, `'${name}'  parameter format invalid.`);
  },
};
