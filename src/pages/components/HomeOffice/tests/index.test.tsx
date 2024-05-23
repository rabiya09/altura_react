import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getHomeOfficeProps } from './__fakes__';
import { HomeOfficeProps } from '../models';
import HomeOffice from '../index';

describe('HomeOffice', () => {
    const props = getHomeOfficeProps();
    test('should match snapshot', () => {
      const {asFragment} = render(<MemoryRouter><HomeOffice {...getHomeOfficeProps() as HomeOfficeProps}/></MemoryRouter>);
      expect(screen.getByTestId('page-title')).toBeInTheDocument();      
      expect(asFragment()).toMatchSnapshot();
    })  
  });