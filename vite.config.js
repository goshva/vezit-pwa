import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEFINES__: JSON.stringify({}),
    __WS_TOKEN__: JSON.stringify('development-token'),
    __HMR_ENABLE_OVERLAY__: 'true',
    __HMR_ENABLE_ERROR_OVERLAY__: 'true',
    __HMR_PORT__: '5173',
    __HMR_TIMEOUT__: '30000',
    __HMR_HOSTNAME__: JSON.stringify('localhost'),
    __HMR_BASE__: JSON.stringify('/'),
    __HMR_PROTOCOL__: JSON.stringify('ws'),
    __HMR_CLIENT_PORT__: '5173',
    __HMR_CONFIG_NAME__: JSON.stringify('vite-hmr-config'),
    __BASE__: JSON.stringify('/'),
    __SERVER_HOST__: JSON.stringify('http://localhost:5173'),
    __HMR_DIRECT_TARGET__: 'true'
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Vue App',
        short_name: 'VueApp',
        description: 'My Vue 3 PWA App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
      timeout: 30000,
      overlay: true
    }
  },
});
