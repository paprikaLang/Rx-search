const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");

const PATH = require('./path');
const path = require('path');
const fs = require('fs');
const entryFiles = fs.readdirSync(PATH.ENTRY_PATH);

const files = [];
const entries = {};

entryFiles
  .filter(file =>
    file.split('.')[0] && file.split('.').slice(-1)[0] === 'js'
  )
  .forEach(file => {
    const filename = file.split('.')[0];
    const filepath = path.join(PATH.ENTRY_PATH, file)
    entries[filename] = filepath;
});

module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  output: {
    filename: 'index.bundle.js',
    path: PATH.BUILD_PATH
  },
  module: {
   rules:[
       {    test: /\.js$/,
	        exclude: /(node_modules)/,
	        loader: "babel-loader",
	        query:{
	        	presets: ["es2015"]
	        }
       },
       {
            test: /\.css$/, 
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback:"style-loader",

                use: [
                    {
                      loader:"css-loader",
                      options:{
                        minimize: true,
                      }
                    },
                    {
                      loader: "postcss-loader"
                    }
                ]
            })
       },
       {
       	    test: require.resolve("jquery"), 
       	    loader: "expose-loader?$"
       },
       {    test: require.resolve("jquery"), 
            loader: "expose-loader?jQuery"
       },
   ]
     
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
     new ExtractTextPlugin("index.bundle.css",{
       allChunks: true
     }),
     new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
     }),
     new HtmlWebpackPlugin({
	      filename: 'index.html',
	      template: 'src/index.html',
	      chunks: ['index']
     }),
     new CleanPlugin(PATH.BUILD_PATH, {
	      root: PATH.ROOT_PATH,
	      verbose: true
	 }),
  ],
  devtool: "cheap-module-eval-source-map",

};
