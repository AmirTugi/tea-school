const path = require('path');
const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', 'js' ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DeclarationBundlerPlugin({
            moduleName:'tea-school',
            out:'index.d.ts',
        })
    ]
};