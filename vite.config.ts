import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: '/src/components',
            provider: '/src/provider/',
            interface: '/src/interface.i.ts',
            utils: '/src/utils',
            services: '/src/services',
        },
    },
})
