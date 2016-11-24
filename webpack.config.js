var path = require("path");
module.exports = {
    entry: './src/index.js', //演示单入口文件
    output: {
        path: path.join(__dirname, 'dist'), //打包输出的路径
        publicPath: "./", //html引用路径，在这里是本地地址。
        // filename: 'app.js', //打包后的名字
        filename: 'lego.js' //打包多个
        // chunkFilename: "js/[id].bundle.js",
        // sourceMapFilename: "[file].map"
    },
    // 新添加的module属性
    module: {
        loaders: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', "stage-0"]
                }
            },
            // { test: /\.css$/, loader: "style!css" },
            // { test: /\.(jpg|png)$/, loader: "url?limit=8192" },
            // { test: /\.scss$/, loader: "style!css!sass" }
        ]
        // loaders: [{
        //     test: /\.css$/,
        //     loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!'
        // }, {
        //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //     loader: "url?limit=10240&minetype=application/font-woff&name=fonts/[name].[md5:hash:hex:7].[ext]"
        // }, {
        //     test: /\.(png|jpg|gif)/,
        //     loader: 'url?prefix=img&limit=10240&name=img/[name].[hash].[ext]'
        // }, {
        //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //     loader: "file?name=fonts/[name].[md5:hash:hex:7].[ext]"
        // }, {
        //     test: /(admin|index)\.html/,
        //     loader: "file?name=[name].html"
        // }, {
        //     test: /tpl[\/\\].*\.html/,
        //     loader: 'html-loader!html-minify'
        // }, {
        //     test: /\.scss$/,
        //     loader: 'style!css!autoprefixer-loader?browsers=last 2 versions!sass'
        // }, ]
    },
    resolve: {
        root: ['./src'],
        alias: {},
        extensions: ["", ".js"]
    }
    // plugins: [
    //     new webpack.DefinePlugin({
    //         __DEV__: JSON.stringify("true"),
    //         VERSION: '1.1',

    //     }),
    //     new webpack.ProvidePlugin({
    //         $: ('jquery'),
    //         Mock: ('mockjs'),
    //     }),
    // ],
    // devtool: "#source-map",
    // devServer: {
    //     contentBase: "./build",
    // }
};
