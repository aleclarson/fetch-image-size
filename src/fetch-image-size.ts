import { imageSize } from 'image-size'

type RequestInit = import('undici-types').RequestInit & {
  signal?: import('./globals').AbortSignal
}

declare const AbortController: typeof import('./globals').AbortController
declare const fetch: typeof import('./globals').fetch
declare const setTimeout: typeof import('./globals').setTimeout

export declare namespace fetchImageSize {
  interface Options extends RequestInit {
    maxBytes?: number
    timeout?: number
  }
  interface Result {
    /**
     * The image type.
     * @example "png"
     */
    type: string
    width: number
    height: number
    /**
     * The number of bytes downloaded before the request was cancelled.
     */
    downloaded: number
  }
}

export async function fetchImageSize(
  link: string,
  { maxBytes, timeout, ...init }: fetchImageSize.Options = {}
): Promise<fetchImageSize.Result | null> {
  const ctrl = new AbortController()
  if (init.signal) {
    init.signal.addEventListener('abort', () => ctrl.abort())
  }
  if (timeout != null) {
    setTimeout(() => ctrl.abort(), timeout)
  }

  const response = await fetch(link, { ...init, signal: ctrl.signal })
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${link}: ${response.status} ${response.statusText}`
    )
  }
  if (!response.headers.get('content-type')?.startsWith('image/')) {
    return null
  }
  if (!response.body) {
    throw new Error(`Failed to fetch ${link}: Response body is not readable`)
  }

  let buffer!: Uint8Array
  let result: ImageSizeResult | undefined
  let error: any

  const reader = response.body.getReader()
  while (true) {
    try {
      const { value } = await reader.read()
      if (value) {
        buffer = buffer ? concat(buffer, value) : value
        result = imageSize(buffer)
      }
      break
    } catch (e) {
      if (e instanceof RangeError) {
        if (maxBytes != null && buffer.byteLength > maxBytes) {
          break
        }
        continue
      }
      error = e
      break
    }
  }

  // todo: do we need both of these?
  ctrl.abort()
  reader.cancel()

  if (result && result.type && result.width != null && result.height != null) {
    return {
      type: result.type,
      width: result.width,
      height: result.height,
      downloaded: buffer.byteLength,
    }
  }

  if (error) {
    throw error
  }

  return null
}

type ImageSizeResult = {
  width: number | undefined
  height: number | undefined
  orientation?: number
  type?: string
}

function concat(a: Uint8Array, b: Uint8Array) {
  let result = new Uint8Array(a.length + b.length)
  result.set(a, 0)
  result.set(b, a.length)
  return result
}
