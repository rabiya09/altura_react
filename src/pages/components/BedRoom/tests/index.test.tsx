import { render, screen } from '@testing-library/react';
import BedRoom from '../index';
import { MemoryRouter } from 'react-router-dom';
import { getProps } from './__fakes__';
import { BedRoomProps } from '../models';

describe('BedRoom', () => {
    const props = getProps();
    test('should match snapshot', () => {
      const {asFragment} = render(<MemoryRouter><BedRoom {...getProps() as BedRoomProps}/></MemoryRouter>);
      expect(screen.getByTestId('page-title')).toBeInTheDocument();      
      expect(asFragment()).toMatchSnapshot();
    })  
  });