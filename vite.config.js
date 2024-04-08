import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {browserslistToTargets} from "lightningcss";
import browserslist from 'browserslist';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        transformer: "lightningcss",
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
        devSourcemap: false
    },
    build: {
        cssMinify: 'lightningcss',
        minify: "terser",
        terserOptions: {
            sourceMap: false,
            compress: {
                passes: 1000,
                drop_console: true,
                drop_debugger: true,
                toplevel: true,
            }
        },
        rollupOptions: {
            treeshake: "recommended",
            output: {
                compact: true,
            }
        },
        sourcemap: false
    },
})
