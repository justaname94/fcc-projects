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
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.vue$/,
        loader: 'vue'
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
    },
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
}
};