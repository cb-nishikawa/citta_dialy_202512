import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html",
      },
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name ? assetInfo.name.split(".").pop() : "";

          if (ext === "css") return "assets/css/style.css";
          // 画像はvite-plugin-static-copyで処理するのでここでは除外
          if (/(woff2?|ttf|otf|eot)$/.test(ext))
            return "assets/fonts/[name][extname]";

          return "assets/[name][extname]";
        },
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`,
      },
    },
  },
  server: {
    open: true,
  },
  plugins: [
    // EJS を保存したら Vite に強制再読込
    {
      name: "force-reload-ejs",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".ejs")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },

    ViteEjsPlugin(),
    
    // 画像を強制的にdistにコピー
    viteStaticCopy({
      targets: [
        {
          src: 'assets/image/**/*',
          dest: 'assets/image'
        },
        {
          src: 'assets/font/**/*',
          dest: 'assets/font'
        }
      ]
    }),
  ],
});
