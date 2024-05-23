import * as React from 'react';

jest.genMockFromModule('html-react-parser');

const parseHtml = (html: string) => <>{html}</>;

module.exports = { default: parseHtml };
