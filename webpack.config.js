const path = require('path');const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'browser',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
        assetModuleFilename: 'assets/img/[name].[ext]'
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },

    plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body'
    }),

    new HtmlWebpackPlugin({
        template: './public/map.html',
        filename: 'map.html'
      })
    ]
}