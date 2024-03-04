import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/fetch-image-size.ts'],
  format: ['cjs', 'esm'],
  dts: true,
})
