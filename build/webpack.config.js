var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        'lego': './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist'), //打包输出的路径
        publicPath: "./dist/", //发布地址。
        filename: '[name].js', //打包多个
        // chunkFilename: "[name].js"
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
        }]
    },
    resolve: {
        root: ['./src'],
        extensions: ["", ".js"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
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
        })
    ]
};

