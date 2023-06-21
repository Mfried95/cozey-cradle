import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'





console.log(`port env is ${process.env.PORT}`)



// https://vitejs.dev/config/
export default defineConfig(
  Object.assign(
    {
      plugins: [react()],
    },
    process.env.PORT
      ? {
          server: {
            port: process.env.PORT,
          },
        }
      : {}
  )
);
