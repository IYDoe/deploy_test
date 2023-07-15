import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3001,
    },
    define: {
        __SERVER_PORT__: process.env.NODE_ENV === 'development' ? 3000 : 443,
        __DOCKER_BUILD__: process.env.VITE_DOCKER_BUILD,
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
            }
        }
    },
    plugins: [ react() ],
})
