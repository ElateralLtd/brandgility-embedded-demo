module.exports = () => ({
  rules: [
    {
      test: /\.js$/,
      include: /src/,
      use: [{ loader: 'babel-loader' }],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ],
});
