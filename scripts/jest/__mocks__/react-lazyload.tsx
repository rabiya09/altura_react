import * as React from 'react';

jest.genMockFromModule('react-lazyload');

const LazyLoad = ({children}) => <>{children}</>;

module.exports = { default: LazyLoad };
