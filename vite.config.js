import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: 'https://github.com/Dmitriy267/momentum',
    root: './src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: './src/index.html',
            },
        },
    },

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
    resolve: {
        alias: {
            '@js': resolve(__dirname, 'src/assets/js'),
            '@jpg': resolve(__dirname, 'src/assets/images'),
        },
    },
});
