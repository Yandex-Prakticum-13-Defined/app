import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { DIST_DIR, SRC_DIR } from './env';
import { jsLoader } from './loaders/js';
import { cssLoader } from './loaders/css';
import { filesLoader } from './loaders/files';

const config = {
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'server.ts'),
  module: {
    rules: [jsLoader, cssLoader.server, filesLoader.server]
  },
  output: {
    path: DIST_DIR,
    filename: 'server.js',
    publicPath: '/static/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })]
};

export default config;
