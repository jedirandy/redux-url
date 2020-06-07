module.exports = function (config) {
    config.set({
        basePath: '.',
        singleRun: false,
        browsers: ['ChromeHeadless'],
        frameworks: ['mocha', 'chai'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            {
                pattern: 'tests/*.spec.js',
                watched: false,
                served: true,
                included: true
            }
        ],
        preprocessors: {
            'tests/*.js': ['webpack'],
            'src/*.js': ['webpack']
        },
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: 'babel-loader',
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
            externals: {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackMiddleware: {
            noInfo: false,
            stats: {
                chunks: false
            }
        },
        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher'
        ],
        browserConsoleLogOptions: {
            terminal: true,
            level: ''
        }
    });
};