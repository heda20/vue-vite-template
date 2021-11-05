/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 10:41:18
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 16:31:26
 */
import type { ConfigEnv, UserConfigExport } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import { viteVConsole } from 'vite-plugin-vconsole'

const resolve = (name: string): string => path.resolve(__dirname, name)

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_APP_PATH,
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name): string => `vant/es/${name}/style`
          }
        ]
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),

      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      viteVConsole({
        entry: resolve('src/main.ts'),
        localEnabled: command === 'serve',
        enabled: command === 'build' && mode === 'test',
        config: {
          maxLogNumber: 1000,
          theme: 'light'
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    resolve: {
      alias: [{ find: '@', replacement: resolve('src') }]
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'static/img/',
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },

    server: {
      open: true,
      host: '0.0.0.0',
      port: 7001
    }
  })
}
