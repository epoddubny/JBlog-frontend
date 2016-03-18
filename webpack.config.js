/**
 * Created by eugene on 18.03.16.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/app',
    entry: './app.js',
    output: {
        path: __dirname + '/app/',
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: [__dirname + '/bower_components']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css", { allChunks: true })
    ]
};