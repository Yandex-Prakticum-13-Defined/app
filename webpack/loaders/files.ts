export const filesLoader = {
  client: {
    test: /\.(jpg|png|svg|woff(2)?)$/,
    type: 'asset/resource'
  },
  server: {
    test: /\.(jpg|png|svg|woff(2)?)$/,
    loader: 'null-loader'
  }
};
