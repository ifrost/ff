const HtmlWebpackPlugin = require('html-webpack-plugin');

let _ = require("lodash");
let config = require("./webpack.base.config");

module.exports = _.assign({
    mode: "production",

    plugins: [
        new HtmlWebpackPlugin({
            title: "Familiada"
        })
    ]

}, config);