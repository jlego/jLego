import path from 'path';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import async from 'rollup-plugin-async';
import regenerator from 'rollup-plugin-regenerator';
// import { minify } from 'uglify-js';
// import istanbul from 'rollup-plugin-istanbul';
// import flow from 'rollup-plugin-flow-no-whitespace';
// import commonjs from 'rollup-plugin-commonjs';
// import node from 'rollup-plugin-node-resolve';

let pkg = require('../package.json');
let external = Object.keys(pkg.dependencies);
const version = process.env.VERSION || pkg['version']
const replaceConfig = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}
const banner = `/**
 * lego.js v${version}
 * (c) ${new Date().getFullYear()} Evan You
 * @license MIT
 */`

export default {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: pkg['main'],
    // entry: path.resolve(__dirname, './src/core/view.js'),
    // dest: 'dist/view.js',
    // entry: path.resolve(__dirname, './src/core/data.js'),
    // dest: 'dist/data.js',
    format: 'cjs',
    moduleName: 'Legojs',
    plugins: [
        // flow(),
        replace(replaceConfig),
        // node(),
        // cjs(),
        // async(),
        // regenerator(),
        // babel(babelrc()),
        buble(),
        uglify({
            mangle: false,
            compress: false,
            output: {
                beautify: true,
                comments: function(node, comment) {
                    var text = comment.value;
                    var type = comment.type;
                    return /@preserve|@license|@cc_on/i.test(text);
                }
            },
        }),
        // istanbul({
        //     exclude: ['test/**/*', 'node_modules/**/*']
        // })
        // babel({
        //     exclude: 'node_modules/**',
        // }),
        // eslint({
        //     exclude: [
        //         'src/styles/**',
        //     ]
        // }),
        // (process.env.NODE_ENV === 'production' && uglify()),
    ],
    external: external,
    banner: banner
};
