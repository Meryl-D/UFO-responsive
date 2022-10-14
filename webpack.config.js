const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'browser',
    mode: 'production',
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
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
    },
    performance: {
        maxAssetSize: 800000,
        maxEntrypointSize: 800000,
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
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            }
        ]
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
      })
    ]
}