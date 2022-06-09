import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DIST_DIR } from './env';
import { jsLoader } from './loaders/js';
import { cssLoader } from './loaders/css';
import { filesLoader } from './loaders/files';

const config = {
  entry: {
    app: './src/client.tsx',
    sw: './src/sw.ts'
  },
  optimization: {
    runtimeChunk: 'single'
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  module: {
    rules: [jsLoader, cssLoader.client, filesLoader.client]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};

export default config;
