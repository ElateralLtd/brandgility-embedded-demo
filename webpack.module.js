module.exports = () => ({
  rules: [
    {
      test: /\.js$/,
      include: /src/,
      use: [{ loader: 'babel-loader' }],
    }
  ],
});
