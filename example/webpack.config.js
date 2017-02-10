var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'index/app': './src/index/app',
        'home/app': './src/home/app',
        'test/app': './src/test/app',
        'main': './src/main',
    },
    output: {
        path: path.join(__dirname, 'dist'), //打包输出的路径
        publicPath: "./dist/", //发布地址。
        filename: '[name].js', //打包多个
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-3'],
                compact: false
            }
        }, {
            test: /\.scss$/,
            loader: "style!css!sass",
        }, {
            test: /\.css$/,
            loader: "style!css",
        }, {
            test: /\.(png|jpe?g)$/,
            loader: 'url?prefix=img&limit=10240&name=img/[name].[hash].[ext]'
        }, {
            test: /\.woff(2)?(\?t=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=10240&minetype=application/font-woff&name=fonts/[name].[md5:hash:hex:7].[ext]"
        }, {
            test: /\.(ttf|eot|svg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file?name=fonts/[name].[md5:hash:hex:7].[ext]"
        }]
    },
    resolve: {
        extensions: ["", ".js"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: false,
            output: {
                beautify: false,
                comments: false
            },
        })
    ],
    // devtool: "#source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        inline: true,
        //其实很简单的，只要配置这个参数就可以了
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false
            }
        },
        port: 3000 //Port Number
    }
};

