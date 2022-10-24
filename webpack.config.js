const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    name: 'browser',
    mode: 'production',
    devtool: 'source-map',
    entry: {
        index: './src/index.js',
        mapModule: './src/mapModule.js',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js',
        clean: true,
        assetModuleFilename: 'assets/img/[name].[ext]'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            // vendor: {
            //   test: /[\\/]node_modules[\\/]/,
            //   name: 'vendors',
            //   chunks: 'all'
            // },
            styles: {
                name: "styles",
                type: "css/mini-extract",
                chunks: "all",
                enforce: true,
            }
          }
        },
        minimizer: [
            new CssMinimizerPlugin(),
          ],
    },
    performance: {
        maxAssetSize: 1100000,
        maxEntrypointSize: 1100000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body',
        }),

        new HtmlWebpackPlugin({
            template: './public/map.html',
            filename: 'map.html'
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: 
                {
                    dynamicTyping: true,
                    header: true,
                    skipEmptyLines: true
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            }
        ]
    }
}