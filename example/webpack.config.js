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
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader' ,
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                'transform-class-properties',
                                'transform-flow-strip-types',
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'redux-url': path.resolve(__dirname, '../src')
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
        new webpack.HotModuleReplacementPlugin(),
    ]
};