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
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader' ,
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                'transform-class-properties',
                                'transform-flow-strip-types'
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};