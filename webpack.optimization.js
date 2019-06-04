const TerserPlugin = require('terser-webpack-plugin');

const minimizer = new TerserPlugin({
  terserOptions: {
    // resolves "TypeError: Super expression must either be null or a function, not undefined" error
    // issue example https://github.com/airbnb/react-with-styles/issues/151
    // see keep_fnames option https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
    // see discussion https://github.com/mishoo/UglifyJS2/issues/3015#issuecomment-375185061
    keep_fnames: true,
    parallel: true,
  },
});

module.exports = () => ({
  runtimeChunk: 'single',
  // disabling of concatenateModules option fixes an issue with dynamic import() chunks
  concatenateModules: false,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      default: false,
      vendor: {
        name: 'vendor',
        test: /node_modules/,
      },
    },
  },
  minimizer: [minimizer],
});
