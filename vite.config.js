import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api`': `https://preview-sharek.kfu.edu.sa/SharekAPPWS/ws/`,
  //   },
  // },
  plugins: [react()],
});
