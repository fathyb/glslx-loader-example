const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: './src/main',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'ts-loader'
            },
            {
                test: /\.gl$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'glslx-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        host: '0.0.0.0',
        port: 8080
    }
}
