# fetch-image-size

Detects image dimensions without downloading the entire image. Requests are aborted as soon as [image-size](https://github.com/image-size/image-size) is able to obtain the image size.

Supports all the image formats supported by [image-size](https://github.com/image-size/image-size):

- BMP
- CUR
- DDS
- GIF
- HEIC (HEIF, AVCI, AVIF)
- ICNS
- ICO
- J2C
- JP2
- JPEG
- KTX (1 and 2)
- PNG
- PNM (PAM, PBM, PFM, PGM, PPM)
- PSD
- SVG
- TGA
- TIFF
- WebP

## Basic usage

```ts
import { fetchImageSize } from 'fetch-image-size'

const size = await fetchImageSize('http://nodejs.org/images/logo.png')
```

Result:

```js
{ width: 245, height: 66, type: 'png', downloaded: 856 }
```

## Prior Art

- [request-image-size](https://github.com/FdezRomero/request-image-size)
