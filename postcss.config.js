const postcssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
module.exports = {
    plugins: [
        
      postcssImport({addDependencyTo: webpack}),
      cssnext({autoprefixer: {browsers: "ie >= 9, ..."}})
    ]
}