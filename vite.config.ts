import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets'),
            'components': path.resolve(__dirname, 'src/components'),
            'constants': path.resolve(__dirname, 'src/constants'),
            'hooks': path.resolve(__dirname, 'src/hooks'),
            'routes': path.resolve(__dirname, 'src/routes'),
            'services': path.resolve(__dirname, 'src/services'),
            'utils': path.resolve(__dirname, 'src/utils'),
            'pages': path.resolve(__dirname, 'src/components/pages'),
        },
    },
});
