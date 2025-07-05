import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api`': `https://preview-sharek.kfu.edu.sa/SharekAPPWS/ws/`,
  //   },
  // },
  server: {
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
    host: true,
    port: 3000,
  },
  plugins: [react()],
});
