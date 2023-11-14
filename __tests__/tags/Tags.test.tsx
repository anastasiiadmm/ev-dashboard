import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import Tags from "../../src/pages/tags/Tags/Tags";

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

jest.mock('~/shared/api/store', () => ({
  tagsStore: {
    tags: [
      { id: 1, title_ky: 'Tag 1', title_ru: 'Тег 1', title_en: 'Tag 1', active: true },
      { id: 2, title_ky: 'Tag 2', title_ru: 'Тег 2', title_en: 'Tag 2', active: false },
    ],
    fetchTags: jest.fn(),
    setChangeStatusesSuccess: jest.fn(),
  },
}));

describe('Tags UI Component', () => {
  test('Render component toMatchSnapshot()', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('it should render mock tags data', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <Tags />
      </BrowserRouter>
    );

    const tagElement1 = getAllByText('Tag 1');
    const tagElement2 = getAllByText('Tag 2');
    expect(tagElement1.length).toBe(2);
    expect(tagElement2.length).toBe(2);
  });
});
