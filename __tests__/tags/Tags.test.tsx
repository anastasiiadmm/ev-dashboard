import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import { Tags } from "../../src/features/tags";

beforeAll(() => {
  process.env.NODE_ENV = 'http://localhost/:8000/';
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

beforeEach(() => {
  cleanup();
});

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost/:8000/',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Tags UI Component', () => {
  test('Render component toMatchSnapshot()', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
