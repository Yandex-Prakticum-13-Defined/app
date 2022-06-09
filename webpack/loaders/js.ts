import path from 'path';

export const jsLoader = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      configFile: path.join(__dirname, '../../tsconfig.json')
    }
  },
  exclude: /node_modules/
};
