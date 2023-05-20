/** Standard headers to ue on requests. */
export const headers = { 'Content-Type': 'application/json' };

/**
 * Represents an HTTP error.
 *
 * @author <a href="mailto:dshrocha.@gmail.com">Diego Rocha</a>
 */
export class HttpError extends Error {
  /**
   * Creates a new instance of the HttpError class.
   * @param code - The HTTP status code of the error.
   * @param message - The error message.
   */
  constructor(public readonly code: number, override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
