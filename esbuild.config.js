const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const esbuildOptions = {
    entryPoints: ['index.tsx'],
    bundle: true,
    outfile: 'build/bundle.js',
    sourcemap: true,
    format: 'esm',
    define: { 'process.env.NODE_ENV': isWatch ? '"development"' : '"production"' },
    loader: { 
        '.tsx': 'tsx', 
        '.ts': 'ts',
        '.svg': 'dataurl',
        '.css': 'css'
    },
    // Mark packages that are loaded via CDN/importmap as external
    external: ['react', 'react-dom', 'react-dom/*', 'recharts'],
};

async function run() {
    if (isWatch) {
        // Use the new context API for development mode
        const ctx = await esbuild.context(esbuildOptions);
        await ctx.watch();
        const { host, port } = await ctx.serve({
            servedir: '.', // Serve from the root project directory
            port: 8001,
        });
        console.log(`esbuild dev server running at http://${host}:${port}`);
    } else {
        // Just build for production
        await esbuild.build(esbuildOptions);
        console.log('Build finished.');
    }
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});