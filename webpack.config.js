const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniExtract = require('mini-css-extract-plugin');
const UglifyJsPLugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin =require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer: {
        contentBase: "./public",
        port: 9000
    },
    optimization: {
        minimizer: [
            new UglifyJsPLugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniExtract({
            filename: 'estilo.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniExtract.loader,
                    //'style-loader',
                    'css-loader', 
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
}