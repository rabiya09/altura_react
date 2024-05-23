import * as React from 'react';

const reacti18next: any = jest.genMockFromModule('react-i18next');

const withTranslation = () => (Component: any) => (props: any) => <Component t={() => 'localized'} {...props} />;

reacti18next.withTranslation = withTranslation;

module.exports = reacti18next;
