var path = require('path');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: [
        path.normalize('es6-shim/es6-shim.min'),
        'reflect-metadata',
        path.normalize('zone.js/dist/zone-microtask'),
        path.resolve('app/app')
    ],
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false // show module paths in the bundle, handy for debugging
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'awesome-typescript',
                query: {
                    doTypeCheck: false,
                    useWebpackText: true
                },
                include: path.resolve('app'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                include: path.resolve('node_modules/angular2'),
                loader: 'strip-sourcemap'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
                //loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
            }
        ],
        noParse: [
                /es6-shim/,
                /reflect-metadata/,
                /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['Android >= 4.3'] }), precss];
    },
    resolve: {
        root: [
            'app'
        ],
        alias: {
            'angular2': path.resolve('node_modules/angular2'),
            'ionic': 'ionic-framework',
        },
        extensions: ['', '.js']
    }
};
