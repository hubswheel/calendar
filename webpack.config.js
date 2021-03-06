const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules/react-fa/node_modules/font-awesome'), // use resolve?
        path.join(__dirname, 'node_modules/bootstrap/dist/css'),
        path.join(__dirname, 'node_modules/bootstrap/dist/fonts'),
        path.join(__dirname, 'node_modules/font-awesome/css'),
        path.join(__dirname, 'node_modules/font-awesome/fonts')
    ],
    build: path.join(__dirname, 'build')
};


process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            React: "react",
            ReactDOM: "react-dom",
            moment: "moment",
            Bootstrap: "bootstrap",
            Icon: "react-fa",
            Immutable: "immutable",
            Signal: "signals"
        })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css',
            include: PATHS.style.concat(PATHS.app)
        }, {
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.app
        }, {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url",
            include: PATHS.style
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file",
            include: PATHS.style
        }]
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            devtool: 'eval-source-map',
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only', // Display only errors to reduce the amount of output.
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()        ]
    }); // plugin: new NpmInstallPlugin({save: true})
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        output: {
            path: PATHS.build,
            filename: 'component.js',
            library: 'shared-components',
            libraryTarget: 'umd'
        },
        externals: {
            'react': 'react',
            'react-dom': 'react-dom'
        }
    });
}
