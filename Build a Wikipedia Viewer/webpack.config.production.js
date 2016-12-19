'use strict';

var webpack = require('webpack');

// Use by the CSS loader. See the loader for a detailed explanation
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // This is the "main" file which should include all other modules
  entry: './src/main.js',

  output: {
    path: './dist',
    // Production only
    publicPath: '/dist/',
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

      // Use DataURL for data less than 1MB
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: { limit: 1024 }
      },

      // Take all the .css and .scss files, convert the SCSS to CSS,
      // combine their contents and stract them to a single "styles.css".
      // Doesn't support HMR
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(["css", "sass"])
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(["css"])
      }
    ]
  },

  babel: {
      presets: ['es2015', "stage-0"],
      plugins: ['transform-runtime']
  },

  vue: {
    loaders: {
      js: 'babel',
      scss: ExtractTextPlugin.extract(["css", "sass"]),
    },
  },

  plugins: [
    // Extract to styles.css file
    new ExtractTextPlugin("styles.css"),
     // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // optimize module ids by occurence count
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    alias: {
      // Fetch vue template compiler which npm does not look for by default
      // (use this if you're loading vue from npm')
      'vue$': 'vue/dist/vue.common.js'
    }
  }
};


