import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/main.ts',
  output: {
    file: 'build/building-blocks.min.js',
    format: 'iife',
    sourceMap: 'inline',
  },
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({
      tsconfig: "tsconfig.json"
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify()
  ]
}