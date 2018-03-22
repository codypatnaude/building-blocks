import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/main.ts',
  output: {
    file: 'build/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify()
  ]
}