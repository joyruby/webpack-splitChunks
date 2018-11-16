const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        index:'./src/index.js',
        index1:'./src/index1.js',
        index2:'./src/index2.js',
        app:'./src/app1.js',
        app1:'./src/app2.js',
        app2:'./src/app3.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({ //可以模板，直接引用files对象，是webpack中state对象
            title: '模板A',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: '模板B',
            chunks: ['index1'],
            filename: 'index1.html'
        }),
        new HtmlWebpackPlugin({
            title: '模板c',
            chunks: ['index2'],
            filename: 'index2.html'
        }),
        new HtmlWebpackPlugin({
            title: '模板d',
            chunks: ['app'],
            filename: 'app.html'
        }),
        new HtmlWebpackPlugin({
            title: '模板f',
            chunks: ['app1'],
            filename: 'app1.html'
        }),
        new HtmlWebpackPlugin({
            title: '模板e',
            chunks: ['app2'],
            filename: 'app2.html'
        }),
        new CleanWebpackPlugin('dist/*.*')
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                common3: {
                  minChunks: 6,
                  priority: 1,
                  name:'common3',
                  reuseExistingChunk: true,
                  chunks:'all'
                },
                common2: {
                    minChunks: 3,
                    priority: -2,
                    name:'common2',
                    chunks (chunk) {
                        // exclude `my-excluded-chunk`
                        return ['app','app1','app2'].includes(chunk.name);
                    }
                },
                common1: {
                    priority: -1,
                    name: 'common1',
                    minChunks: 3,
                    enforce: true,
                    chunks (chunk) {
                        return ['index','index1','index2'].includes(chunk.name);
                    }
                }
            }
        }
    },
    output: {
        filename: '[name]-[chunkhash].js',
        path: path.resolve(__dirname,'dist')
    }
}