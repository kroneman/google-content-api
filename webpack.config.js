const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

const path = require('path');

const { NODE_ENV, GOOGLE_DOC_ENDPOINT } = process.env;

console.log(GOOGLE_DOC_ENDPOINT)
const config = {
    mode: NODE_ENV || 'development',
    devtool: 'inline-source-map',
    context: path.join(__dirname, './src'),
    entry: './main',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve('./dist')
    },
    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            templateParameters: {
                title: 'Gravity Points'
            },
            template: path.resolve('./public/index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
};

module.exports = config;