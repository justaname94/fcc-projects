'use strict';

// Use by the CSS loader. See the loader for a detailed explanation
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // This is the "main" file which should include all other modules
  entry: './src/main.js',

  output: {
    path: './dist',
    // Production only (activated in dev because for some reason
    // is needed for HMR to work)
    publicPath: 'dist/',
    filename: 'bundle.js'
  },

  module: {
    // Special compilation rules
    loaders: [
      // Ask webpack to check: if this file ends with
      // .js then apply some transforms
      {
        test: /\.js$/,
        // Transfrom it with babel
        loader: 'babel',
        // don't transform node_modules folder (which don't need to compile)
        exclude: /(node_modules|bower_components)/,
      },

      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },

      // Take all the .css files, combine their contents and stract them to a single "styles.css"
      // Doesn't support HMR
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract("style-loader","css-loader")
      // },

      // Use DataURL for images less than 1MB
      {
        test: [/\.png$/, /\.jpg$/],
        loader: 'url-loader',
        query: { limit: 1024 }
      }
    ]
  },

  // plugins: [
  //   new ExtractTextPlugin("styles.css") // Extract to styles.css file
  // ],

  babel: {
      presets: ['es2015', "stage-0"],
      plugins: ['transform-runtime']
  },

  vue: {
    loaders: {
      js: 'babel',
      // css: ExtractTextPlugin.extract("css"),
    },
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
}
};