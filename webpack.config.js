const path = require('path');
const dotenv = require('dotenv');

const getOptimization = require('./webpack.optimization');
const getModule = require('./webpack.module');
const getPlugins = require('./webpack.plugins');
const getResolve = require('./webpack.resolve');
const getDevServer = require('./webpack.dev-server');

const dotenvConfig = dotenv.config();

if (dotenvConfig.error) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.default') });
}
// suppress deprecation warnings from DotenvPlugin
// https://github.com/tomchentw/unused-files-webpack-plugin/issues/22
process.noDeprecation = true;

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not set. You should fix it before continue.');
} else if (!['development', 'production', 'test'].includes(NODE_ENV)) {
  throw new Error(`"${NODE_ENV}" is not a valid NODE_ENV value!`);
}

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  entry: {
    app: path.resolve('src', 'index.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: env.production ? 'js/[chunkhash:6].[name].js' : 'js/[name].js',
    chunkFilename: env.production ? 'js/[chunkhash:6].[name].chunk.js' : 'js/[name].chunk.js',
    publicPath: '/',
  },
  optimization: getOptimization(),
  module: getModule(),
  plugins: getPlugins(env),
  resolve: getResolve(),
  devServer: getDevServer(),
  devtool: env.development && 'inline-source-map',
  watchOptions: {
    aggregateTimeout: 100,
  },
  performance: {
    hints: false,
  },
  stats: {
    chunks: false,
    hash: false,
    version: false,
    errorDetails: true,
  },
});
