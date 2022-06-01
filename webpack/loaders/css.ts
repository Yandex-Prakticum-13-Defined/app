import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const cssLoader = {
  client: {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 }
      },
      'postcss-loader',
      'sass-loader'
    ]
  },
  server: {
    test: /\.scss$/,
    loader: 'null-loader'
  }
};
