'use strict';

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

      // Use DataURL for data less than 1MB
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: { limit: 1024 }
      },

      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
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
      scss: 'style!css!sass'
    },
  },

  resolve: {
    alias: {
      // Fetch vue template compiler which npm does not look for by default
      // (use this if you're loading vue from npm')
      'vue$': 'vue/dist/vue.common.js'
    }
  }
};


