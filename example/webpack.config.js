const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: [
                        'transform-object-rest-spread',
                        'transform-class-properties',
                        'transform-flow-strip-types',
                        require.resolve('babel-plugin-inferno')
                    ]
                },
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        alias: {
            'redux-simple-router': path.resolve(__dirname, '../src')
        }
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};