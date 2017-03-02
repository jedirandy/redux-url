const path = require('path');

module.exports = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'ReduxURL',
        libraryTarget: 'umd'
    },
    externals: {
        'qs': {
            commonjs: 'qs',
            commonjs2: 'qs',
            amd: 'qs',
            root: 'Qs'
        },
        'url-pattern': {
            commonjs: 'url-pattern',
            commonjs2: 'url-pattern',
            amd: 'url-pattern',
            root: 'UrlPattern'
        }
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
                        'transform-flow-strip-types'
                    ]
                },
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};