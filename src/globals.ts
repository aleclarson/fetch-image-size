import type {
  AddEventListenerOptions,
  Event,
  EventListenerOptions,
} from 'undici-types/patch'

export declare const fetch: typeof import('undici-types').fetch

export declare function setTimeout(
  callback: (...args: any[]) => void,
  ms: number,
  ...args: any[]
): any

/**
 * A controller object that allows you to abort one or more DOM requests as and when desired.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController)
 */
export declare interface AbortController {
  /**
   * Returns the AbortSignal object associated with this object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/signal)
   */
  readonly signal: AbortSignal
  /**
   * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that t  he associated activity is to be aborted.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
   */
  abort(reason?: any): void
}

export declare var AbortController: {
  prototype: AbortController
  new (): AbortController
}

export declare interface AbortSignal {
  /**
   * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/aborted)
   */
  readonly aborted: boolean
  /**
   * A function that will add an event listener to the given event type to this AbortSignal.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/addEventListener)
   */
  addEventListener(
    type: 'abort',
    listener: (this: AbortSignal, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  /**
   * A function that will remove an event listener to the given event type to this AbortSignal.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/removeEventListener)
   */
  removeEventListener(
    type: 'abort',
    listener: (this: AbortSignal, ev: Event) => any,
    options?: boolean | EventListenerOptions
  ): void
}
