"use strict";

var path = require("path");

module.exports = {
    mode: "development",
    entry: {
        "app": "./src/App.tsx",
    },
    output: {
        publicPath: "/build/js/",
        path: path.resolve(__dirname, 'build/js'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};