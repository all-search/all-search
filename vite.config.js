import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// import option from '@all-search/option/index.html'
// import contentScript from '@all-search/contentScript'
// import background from '@all-search/background'
// import { crx } from '@crxjs/vite-plugin'
// import manifest from './manifest.json'

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '$': 'vite-plugin-monkey/dist/client'
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
      vue()
      // crx({
      //   manifest
      // })
    ],
    build: {
      target: 'es2015',
      emptyOutDir: mode === 'production',
      minify: mode === 'production',
      inlineDynamicImports: true,
      rollupOptions: {
        input: {
          option: path.resolve(__dirname, 'packages/option/index.html'),
          contentScript: path.resolve(__dirname, 'packages/contentScript/index.js'),
          background: path.resolve(__dirname, 'packages/background/index.js')
        },
        output: {
          assetFileNames: "assets/[name].[ext]",
          entryFileNames: "[name].js",
          chunkFileNames: "assets/[name].js",
        }
      }
    }
  }
})
