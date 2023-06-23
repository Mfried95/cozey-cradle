import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: Object.assign(
    {
      host: true,
      proxy: {
        "/bookings": process.env.backend || "http://localhost:3000",
        "/api": process.env.backend || "http://localhost:3000",
      },
    },
    process.env.PORT
      ? {
          // server: {
          port: process.env.PORT,
          // },
        }
      : {}
  ),
});
