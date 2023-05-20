import type { Request } from 'express';

export {};

declare global {
  /**
   * Represents an error message object.
   */
  interface ErrorMessage
    extends Request<{
      /** Error message. */
      message: string;
      /** HTTP status message. */
      status: number;
      /** Timestamp when the error occurred. */
      timestamp: Date = Date.now();
    }> {}

  /**
   * Represents the server which interacts with directly to the translation service provider.
   */
  namespace Master {
    /**
     * Represents the API request in the Master server.
     */
    interface ReqQuery {
      /** The text string to be translated */
      readonly text: string;
      /** The language of the original text (ISO language code) */
      readonly from: string;
      /** The language to translate into (ISO language code) */
      readonly to: string;
    }

    /**
     * Represents the API response in the Master service.
     */
    interface ResBody {
      /** The original text string */
      readonly originalText: string;
      /** The translated text string */
      readonly translation: string;
      /** The language of the original text (ISO language code) */
      readonly from: string;
      /** The language to translate into (ISO language code) */
      readonly to: string;
      /**
       * The amount of time (in milliseconds) between the moment the
       * request arrives and the moment the response is sent back.
       */
      readonly responseTime: number;
    }
  }

  /**
   * Represents the server which depends on other's interaction with providers.
   */
  namespace Slave {
    /**
     * Represents the API request in the Slave server.
     */
    interface ReqQuery {
      /** The text string to be translated. */
      readonly text: string;
      /** The language of the original text (ISO language code). */
      readonly from: string;
    }

    /**
     * Represents the API response in the Slave server.
     */
    interface ResBody {
      /** The original text string */
      readonly originalText: string;
      /** The language of the original text (ISO language code) */
      readonly from: string;
      /**
       * The amount of time (in milliseconds) between the moment the
       * request arrives and the moment the response is sent back
       */
      readonly responseTime: number;
      /* An array of translation objects */
      readonly translations: [
        {
          /* The translated text string */
          readonly translation: string;
          /* The language of the translated text (ISO language code) */
          readonly to: string;
          /* The response time returned by the Master for this translation */
          readonly responseTime: number;
        },
      ];
    }
  }

  /**
   * Represents HTTP responses returned from translation provider.
   * @see https://libretranslate.com/spec
   */
  namespace I18nResponse {
    /**
     * Represents translated text response.
     * @see https://libretranslate.com/docs/#/translate/post_translate
     */
    interface Translate {
      /** Translated text(s). */
      translatedText: string | string[];
    }
    /**
     * Represents supported target language in response.
     * @see https://libretranslate.com/docs/#/translate/get_languages
     */
    interface Language {
      /** Language code. */
      code: string;
      /** Human-readable language name (in English). */
      name: string;
      /** Supported target language codes. */
      targets: string[];
    }
  }
}
