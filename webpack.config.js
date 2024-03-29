const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const                 _ = require('lodash');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var PRODUCTION  = process.env.NODE_ENV === 'production';
console.log(`FLAVOR ${process.env.FLAVOR}`);
let suffix      = process.env.FLAVOR == 'dev' ? '.dev' : '';
let envFilePath = `.env${suffix}`;
console.log(`envFilePath ${envFilePath}`);

var dotenvConfig = require('dotenv').config(
    {path: envFilePath}
).parsed;

console.log(dotenvConfig);

var plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin(
        {
            title: 'PSQ',
            template: './src/index.ejs'
        }
    ),
    new CopyWebpackPlugin([
            {from: './src/img', to: 'img'}
        ],
        {copyUnmodified: false}
    ),
    new webpack.DefinePlugin({
        'process.env': _(process.env)
            .pick(_.keys(dotenvConfig))
            .mapValues((v) => (JSON.stringify(v)))
        .value()
})
];

var productionPlugins = [

];

var devPlugins = [
    new webpack.HotModuleReplacementPlugin()
];

function styleLoader(loaders) {

    if (PRODUCTION)
        return [MiniCssExtractPlugin.loader, ...loaders];

    return [ 'style-loader', ...loaders ];
}

/**
 *
 * @returns {object}
 */
function postCSSLoader() {
    return {
        loader: "postcss-loader",
        options: {
            plugins: function () {
                return [require("autoprefixer")];
            }
        }
    }
}

const config = {
    entry: {
        'index': './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: styleLoader(['css-loader', postCSSLoader()])
            },
            {
                test: /\.less/,
                exclude: /\.module\.less/,
                use: styleLoader(['css-loader', postCSSLoader(), 'less-loader'])
            },
            {
                test: /\.scss/,
                exclude: /\.module\.scss/,
                use: styleLoader(['css-loader', postCSSLoader(), 'sass-loader'])
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.jpg|\.png|\.gif$/,
                use: "file-loader?name=images/[name].[ext]"
            },
            {
                test: /\.svg/,
                use: "file-loader?name=svg/[name].[ext]!svgo-loader"
            }
        ]
    },
    plugins: PRODUCTION
        ? plugins.concat(productionPlugins)
        : plugins.concat(devPlugins),
};


module.exports = (env, argv) => {
    let mode = argv.mode;
    console.log(`mode is ${mode}`);
    if(mode === undefined) {
        console.log("setting mode to development ...");
        mode = 'development';
    }
    config.mode = mode;

    if (mode === 'development') {
        config.devtool = 'source-map';
        config.devServer = {
            contentBase: './dist',
                historyApiFallback: true
        };
    }

    if (mode === 'production') {
        //...
    }

    return config;
};