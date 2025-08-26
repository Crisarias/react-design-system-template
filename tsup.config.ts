import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

const env = process.env.NODE_ENV

export default defineConfig({
  splitting: true,
  sourcemap: env === 'production', // source map is only available in prod
  clean: true, // rimraf disr
  dts: true, // generate dts file for main module
  format: ['cjs', 'esm'], // generate cjs and esm files
  minify: env === 'production',
  bundle: env === 'production',
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: env === 'development',
  target: 'es2021',
  outDir: env === 'production' ? 'dist' : 'lib',
  entry: ['src/**/*.ts'],
  tsconfig: './tsconfig.build.json',
  esbuildPlugins: [sassPlugin()]
})
