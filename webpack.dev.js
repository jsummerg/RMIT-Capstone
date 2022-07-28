const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    output: { 
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'var',
        library: 'Client',
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    // stats: 'verbose',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new Dotenv(),
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")],
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            // verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
