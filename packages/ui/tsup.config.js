import { defineConfig } from 'tsup'

export default defineConfig({
  entry : ['blog-components.ts'],
  splitting : false,
  clean : true,
  format : ['esm'],
  external : ['react'],
  // watch : true,
  onSuccess : 'node mv-result.js'
})