'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const getClientEnvironment = require('./env');
const paths = require('./paths');
// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          //require('./../../postcss/eds-adapter'), // TODO: run only for marketplace
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: false,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      },
    );
  }
  return loaders;
};

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    //require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexTs,
  ],
  resolve: {
    modules: ['node_modules'].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.css', '.scss'],
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
    alias: {
      Common: path.resolve(process.cwd(), './src/Common/'),
      Pages: path.resolve(process.cwd(), './src/Pages/'),
      Store: path.resolve(process.cwd(), './src/Store/'),
      componentFactory: path.resolve(process.cwd(), './src/componentFactory/'),
    },
    fallback: {
      //   dgram: false,
      //   // provide a custom implementation of the 'dgram' module (if needed)
      //   // dgram: require.resolve('custom-dgram')
      //   fs: 'empty',
      //   // provide a fallback value for the 'net' module (if used)
      //   net: 'empty',
      //   // provide a fallback value for the 'tls' module (if used)
      //   tls: 'empty',
      //   child_process: false,
      crypto: false,
      stream: require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      // { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            issuer: /\.s?css$/,
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['@loadable/babel-plugin'],
                },
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules\\core-js/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  compact: false,
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['@loadable/babel-plugin'],
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
            ],
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [require('postcss-import')()],
                  },
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => {
                    const defaultPlugins = [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        flexbox: 'no-2009',
                      }),
                    ];

                    // if (project === marketplaceManifest.name) {
                    //   defaultPlugins.push(require('./../../postcss/eds-adapter'));
                    // }

                    return defaultPlugins;
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: cssModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [require('postcss-import')()],
                  },
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => {
                    const defaultPlugins = [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        flexbox: 'no-2009',
                      }),
                    ];

                    // if (project === marketplaceManifest.name) {
                    //   defaultPlugins.push(require('./../../postcss/eds-adapter'));
                    // }

                    return defaultPlugins;
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [require('postcss-import')()],
                  },
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => {
                    const defaultPlugins = [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        flexbox: 'no-2009',
                      }),
                    ];

                    // if (project === marketplaceManifest.name) {
                    //   defaultPlugins.push(require('./../../postcss/eds-adapter'));
                    // }

                    return defaultPlugins;
                  },
                  sourceMap: true,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebook/create-react-app/issues/2677
                  ident: 'postcss',
                  postcssOptions: {
                    plugins: [require('postcss-import')()],
                  },
                  plugins: () => {
                    const defaultPlugins = [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        flexbox: 'no-2009',
                      }),
                    ];

                    // if (project === marketplaceManifest.name) {
                    //   defaultPlugins.push(require('./../../postcss/eds-adapter'));
                    // }

                    return defaultPlugins;
                  },
                  sourceMap: true,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true,
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          {
            test: /\.(graphql)$/,
            loader: 'graphql-tag/loader',
          },
          {
            test: /\.svg$/,
            exclude: /node_modules\\font-awesome/,
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
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        utilityVendor: {
          test: /[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
          name: 'utilityVendor',
        },
        fontVendor: {
          test: /[\\/]node_modules[\\/](@fortawesome)[\\/]/,
          name: 'fontVendor',
        },
      },
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', paths.appHtml),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CopyWebpackPlugin({ patterns: [{ from: paths.fontStylePath, to: paths.clientFontStylePath }] }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    // new WebpackManifestPlugin({
    //   fileName: 'asset-manifest.json',
    //   publicPath: publicPath,
    // }),
    // TS lint and compilation
    // new ForkTsCheckerWebpackPlugin({
    //   include: ['/Project/', '/Feature/', '/Foundation/'],
    //   tsconfig: './tsconfig.json',
    //   tslint: './tslint.json',
    // }),
    // Uncomment the line to analyze the bundle content
    // new BundleAnalyzerPlugin(),
    // new Visualizer({
    //   filename: './statistics.html',
    // }),
  ],
  performance: false,
  stats: 'errors-only',
};