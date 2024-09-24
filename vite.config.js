import { defineConfig } from 'vite';

export default defineConfig({
    base: 'https://github.com/Dmitriy267/',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        proxyReq.setHeader('Origin', 'http://localhost:3000');
                    });
                },
            },
        },
    },
});
