const path = require('path');
const webpack = require('webpack');

// Ensure that env is setup
require('./env');
const paths = require('./paths');
const CopyPlugin = require('copy-webpack-plugin');

// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.
const marketplaceManifest = require('./../../../Project/Marketplace/client/manifest');

const argv = process.argv.slice(2);
const debug = argv.indexOf('--debug') !== -1;

if (debug) {
  console.log('DEBUG CONFIGURATION');
}

const project = process.env.PROJECT;

const copyPluginSettings = [];

if (project === marketplaceManifest.name && !debug) {
  copyPluginSettings.push({
    from: paths.appServerSettings,
    to: `${paths.appBuild}/ssrSettings.json`,
  });
}

copyPluginSettings.push({ from: paths.fontStylePath, to: `${paths.appBuild}/${paths.clientFontStylePath}` });

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: paths.appServerIndexTs,
  },
  output: {
    path: paths.appBuild,
    filename: '[name].bundle.js',
    libraryTarget: 'this', // this option is required for use with JavaScriptViewEngine
  },
  optimization: {
    minimize: !debug,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
              plugins: ['@loadable/babel-plugin'],
            },
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          }
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: require.resolve('html-loader') },
      },
      {
        test: /\.(graphql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        // anything not TS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!ts|tsx|svg|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'svg-inline-loader',
            options: {
              removeSVGTagAttrs: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ['node_modules'].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    // alias: {
    //   Foundation: path.resolve(process.cwd(), './Foundation/'),
    //   Project: path.resolve(process.cwd(), './Project/'),
    //   Feature: path.resolve(process.cwd(), './Feature/'),
    // },
  },
  plugins: [
    // This is commented because ts-lint now is executed once for entire codebase, please check 'ts-lint' task in packages.json
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   include: ['/Project/', '/Feature/', '/Foundation/'],
    //   tsconfig: './tsconfig.json',
    //   tslint: './tslint.json',
    // }),

    // TODO: consume API from configuration file
    // API_KEY is hard-coded here, because for right now there is no need in separate builds per project
    // And we have same keys
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify('{D24C87E5-C517-4DA1-8FD3-031439D00014}'),
    }),
    new CopyPlugin(copyPluginSettings),
  ],
};
