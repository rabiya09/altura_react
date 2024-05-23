const { getServedPath, resolveApp, getPublicUrl } = require('./utils');
const fs = require('fs');

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('./src'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexTs: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  publicPath: '/',
  fontStylePath: resolveApp('node_modules/cdx-component-library/fonts'),
  clientFontStylePath: 'fonts',
  RootRoutePath: resolveApp('build/#{RoutePath}'),
  RouteFolderPath: resolveApp('build/#{RoutePath}/static'),
  StaticFolderPath: resolveApp('build/static'),
};

module.exports.srcPaths = [module.exports.appSrc];

module.exports.useYarn = false;
