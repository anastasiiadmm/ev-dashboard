import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../__mocks__/matchMedia.mock'

import App from '../src/app/App';

describe('App',  () => {
  test('renders App component', async () => {
    render(
      <App />
    );

    expect(screen.getByTestId('app-component')).toBeVisible();
  });

});
