import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";

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
          if (/(png|jpg|jpeg|gif|svg|webp|avif)$/.test(ext))
            return "assets/images/[name][extname]";
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
  ],
});
