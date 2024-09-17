/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from "quasar/wrappers";
import { fileURLToPath } from "node:url";

export default configure((ctx) => {
  return {
    boot: ["i18n", "axios"],
    css: ["app.scss"],
    extras: [
      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],
    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20",
      },

      vueRouterMode: "hash", // available values: 'hash', 'history'
      vitePlugins: [
        [
          "@intlify/unplugin-vue-i18n/vite",
          {
            ssr: ctx.modeName === "ssr",
            include: [fileURLToPath(new URL("./src/i18n", import.meta.url))],
          },
        ],
        [
          "vite-plugin-checker",
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: true, // opens browser window automatically
    },
    ssr: {
      prodPort: 3000,
      middlewares: [
        "render", // keep this as last one
      ],
      pwa: false,
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: "GenerateSW",
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
