import tailwindcss from '@tailwindcss/vite'; // https://vite.dev/config/
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 4242,
	},
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
