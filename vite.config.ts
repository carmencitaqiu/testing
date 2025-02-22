import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => {
            return name !== 'time-picker' ? `antd/es/${name}/style`: ''
          },
        },
      ],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // "primary-color": "#000000",
          // "link-color": "#1DA57A",
          // "border-radius-base": "4px",
        },
      },
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    },
  },
});
