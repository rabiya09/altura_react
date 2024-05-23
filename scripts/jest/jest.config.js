module.exports = {
  // all paths below should be assigned relative to src root
  rootDir: './../../',
  roots: ['<rootDir>/src/pages'],
  testEnvironment: 'jsdom',
  setupFiles: [
   // '<rootDir>/scripts/jest/setup/historyMocks.ts',
   // '<rootDir>/scripts/jest/setup/browserMocks.ts',
   // '<rootDir>/scripts/jest/setup/enzyme.ts',
  //  '<rootDir>/scripts/jest/setup/jsdom.ts',
  ],
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: {url:'http://localhost'},
  coverageReporters: ['json', 'html', 'cobertura', 'text-summary', 'lcov'],
  // this path is duplicated in the build.cake for xUnit tests
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      // TODO: bring up to 60-80%
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // moduleDirectories: ['<rootDir>/src'],
  moduleNameMapper: {
    //'Common/(.*)': '<rootDir>/Common/$1',
    //'Pages/(.*)': '<rootDir>/Pages/$1',
    '((.(css|scss)$)|(/styles$))': '<rootDir>/scripts/jest/__mocks__/styleMock.js',
    '.svg$': '<rootDir>/scripts/jest/__mocks__/svgMock.js',
    'react-i18next': '<rootDir>/scripts/jest/__mocks__/react_i18next.tsx',
    'react-lazyload': '<rootDir>/scripts/jest/__mocks__/react-lazyload.tsx',
    'html-react-parser': '<rootDir>/scripts/jest/__mocks__/htmlReactParser.tsx',
    'react-svg-worldmap': '<rootDir>/scripts/jest/__mocks__/react-svg-worldmap.esm.js',
  }, 
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!**/actionTypes.ts',
    '!**/Models.Generated.ts',
    '!**/**/__fakes__/**',
    '!**/**/__mocks__/**',
  ],
  transformIgnorePatterns: ['/node_modules/(?!cdx-component-library|cdx-common-lib|cdx-cms-interface-lib|axios)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
};
