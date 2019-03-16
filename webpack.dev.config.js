const _ = require("lodash");
const config = require("./webpack.base.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = _.assign({

    mode: "development",

    devtool: "inline-source-map",

    devServer: {
        contentBase: ".",
        compress: true,
        port: 9000
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Development"
        })
    ]
}, config);