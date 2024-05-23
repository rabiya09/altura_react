import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/* test.only('renders app name', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app-name');
  expect(linkElement).toBeInTheDocument();
}); */
describe('rabiya', () => {
  test('should match snapshot', () => {
    const {asFragment} = render(<App />);
    expect(screen.getAllByText(/Register/i)[0]).toBeInTheDocument();
   // expect(screen.getByTestId('app-name')).toBeInTheDocument();
    
    expect(asFragment()).toMatchSnapshot();
  })

});