module.exports = function(config) {
    config.set({
        basePath: '.',
        singleRun: false,
        browsers: ['PhantomJS'],
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
                        }
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
            'karma-phantomjs-launcher'
        ],
        browserConsoleLogOptions: {
            terminal: true,
            level: ''
        }
    });
};