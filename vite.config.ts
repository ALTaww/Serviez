import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/styles/variables.scss" as *;
          @use "@/scss/styles/mixins.scss" as *;
          @use "@/scss/styles/extends.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  cacheDir: "./.vite", // Добавьте явное указание кэша
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      // Явно укажите тяжёлые зависимости
    ],
    exclude: ["js-big-decimal"],
  }, // Исключите проблемные пакеты
});
