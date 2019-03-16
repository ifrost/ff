const path = require('path');

module.exports = {

    context: path.resolve(__dirname, 'lib'),

    entry: "./index.ts",

    output: {
        filename: "ff.js",
        libraryTarget: "umd",
        library: "ff",
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /.ts$/,
                use: "ts-loader",
                exclude: /nodule_modules/
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js"]
    }

};