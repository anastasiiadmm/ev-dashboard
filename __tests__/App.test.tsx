import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';
import { act } from "react-test-renderer";
import '../__mocks__/matchMedia.mock'

import App from '../src/app/App';

describe('App',  () => {
  test('renders App component', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(asFragment).toMatchSnapshot();

    await act(async () => {});
  });

});
