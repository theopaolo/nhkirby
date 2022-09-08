const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../assets/js/app.js'),
    output:
    {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../assets/dist/')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../assets') }
            ]
        }),
    ],
    module:
    {
        rules:
        [

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },
        ]
    }
}
