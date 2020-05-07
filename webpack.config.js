const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config();

const path = require('path');

const { NODE_ENV } = process.env;

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