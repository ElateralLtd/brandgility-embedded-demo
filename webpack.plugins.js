const DotenvPlugin = require('webpack-dotenv-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    inject: true,
    minify: env.production ? {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    } : false,
  });
  const dotenvPlugin = new DotenvPlugin({
    sample: '.env.default',
    path: '.env',
  });
  const copyPlugin = new CopyWebpackPlugin({
    patterns: [
      { from: '_redirects', to: '.' },
    ],
  });

  const plugins = [
    htmlWebpackPlugin,
    dotenvPlugin,
    copyPlugin,
  ];

  return plugins;
};
