'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
// const publicPath = paths.servedPath;
const publicPath = paths.publicPath;
// Source maps are resource heavy and can cause out of memory issue for large source files.
const argv = process.argv.slice(2);

const debug = argv.indexOf('--debug') !== -1;

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  //
  // In production, we only want to load the polyfills and the app code.
  entry: [require.resolve('./polyfills'), paths.appIndexTs],
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: '#{RoutePath}/' + 'static/js/[name].[chunkhash:8].js',
    chunkFilename: '#{RoutePath}/' + 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: 'self',
  },
  optimization: {
    minimize: !debug,
    minimizer: debug
      ? undefined
      : [
          new UglifyJsPlugin({
            uglifyOptions: {
              parse: {
                // we want uglify-js to parse ecma 8 code. However, we don't want it
                // to apply any minfication steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the 'compress' and 'output'
                // sections only apply transformations that are ecma 5 safe
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
              },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            // Enable file caching
            cache: true,
            sourceMap: debug,
          }),
          new OptimizeCSSAssetsPlugin(),
        ],
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
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ['node_modules'].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean),
    ),
    alias: {
      Common: path.resolve(process.cwd(), './src/Common/'),
      Pages: path.resolve(process.cwd(), './src/Pages/'),
      Store: path.resolve(process.cwd(), './src/Store/'),
      componentFactory: path.resolve(process.cwd(), './src/componentFactory/'),
    },
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.mjs'],
    // alias: {
    //   Foundation: path.resolve(process.cwd(), './Foundation/'),
    //   Project: path.resolve(process.cwd(), './Project/'),
    //   Feature: path.resolve(process.cwd(), './Feature/'),
    // },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
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
      fs: false,
      crypto: false,
      stream: require.resolve('stream-browserify'),
    },
  },

  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      // { parser: { requireEnsure: false } },

      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works just like "file" loader but it also embeds
          // assets smaller than specified size as data URLs to avoid requests.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            issuer: /\.s?css$/,
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process application JS with Babel.
          // The preset includes JSX, Flow, and some ESnext features.
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['@loadable/babel-plugin'],
                },
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  // disable type checker - we will use it in fork plugin
                  transpileOnly: true,
                },
              },
            ],
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.js$/,
            //exclude: project === marketplaceManifest.name ? /node_modules\\core-js/ : /node_modules/,
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              // require.resolve('thread-loader'),
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  compact: false,
                  presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
                  plugins: ['@loadable/babel-plugin'],
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
            ],
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // `MiniCSSExtractPlugin` extracts styles into CSS
          // files. If you use code splitting, async bundles will have their own separate CSS chunk file.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: debug,
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
                  sourceMap: debug,
                },
              },
            ],
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: debug,
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
                  sourceMap: debug,
                },
              },
            ],
          },
          // Opt-in support for SASS. The logic here is somewhat similar
          // as in the CSS routine, except that "sass-loader" runs first
          // to compile SASS files into CSS.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass

          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: debug,
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
                  sourceMap: debug,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: debug,
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass

          // Node 18 chnge
          {
            test: sassModuleRegex,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: debug,
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
                  sourceMap: debug,
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: debug,
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            exclude: /node_modules\\font-awesome/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
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
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new LoadablePlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: paths.fontStylePath, to: `${paths.appBuild}/static/${paths.clientFontStylePath}` }],
    }),
    new HtmlWebpackPlugin({
      inject: true, // TODO: verify if `inject` property or custom logic should be used for inserting JS, CSS, etc.
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    // TODO: consume API from configuration file
    // API_KEY is hard-coded here, because for right now there is no need in separate builds per project
    // And we have same keys
    new webpack.DefinePlugin({
      ...env.stringified,
      'process.env.API_KEY': JSON.stringify('{D24C87E5-C517-4DA1-8FD3-031439D00014}'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '#{RoutePath}/' + 'static/css/[name].[contenthash:8].css',
      chunkFilename: '#{RoutePath}/' + 'static/css/[name].[contenthash:8].chunk.css',
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json',
    //   publicPath: publicPath,
    // }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    // new SWPrecacheWebpackPlugin({
    //   // By default, a cache-busting query parameter is appended to requests
    //   // used to populate the caches, to ensure the responses are fresh.
    //   // If a URL is already hashed by Webpack, then there is no concern
    //   // about it being stale, and the cache-busting can be skipped.
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   logger(message) {
    //     if (message.indexOf('Total precache size is') === 0) {
    //       // This message occurs for every build and is a bit too noisy.
    //       return;
    //     }
    //     if (message.indexOf('Skipping static resource') === 0) {
    //       // This message obscures real errors so we ignore it.
    //       // https://github.com/facebook/create-react-app/issues/2612
    //       return;
    //     }
    //     console.log(message);
    //   },
    //   minify: true,
    //   // Don't precache sourcemaps (they're large) and build asset manifest:
    //   staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    //   // `navigateFallback` and `navigateFallbackWhitelist` are disabled by default; see
    //   // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#service-worker-considerations
    //   // navigateFallback: publicUrl + '/index.html',
    //   // navigateFallbackWhitelist: [/^(?!\/__).*/],
    // }),
    // This is commented because ts-lint now is executed once for entire codebase, please check 'ts-lint' task in packages.json
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   include: ['/Project/', '/Feature/', '/Foundation/'],
    //   tsconfig: './tsconfig.json',
    //   tslint: './tslint.json',
    // }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // Service worker Workbox configuration.
  ].filter(Boolean),
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.

  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};