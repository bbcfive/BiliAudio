var webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    })
  ],
  node: {
    child_process: "empty",
    fs: 'empty'
  },
};