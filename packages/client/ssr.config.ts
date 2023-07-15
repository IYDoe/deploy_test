import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
    plugins: [ react() ],
    define: {
        __SERVER_PORT__: 3000,
        __DOCKER_BUILD__: process.env.VITE_DOCKER_BUILD,
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'ssr.tsx'),
            name: 'Client',
            formats: [ 'cjs' ],
        },
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                dir: 'dist-ssr',
            },
        }
    }
})
