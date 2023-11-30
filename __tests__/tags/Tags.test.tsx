import React from 'react';
import { act, render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import Tags from "../../src/pages/tags/Tags/Tags";
import { CreateEditTagModal } from "../../src/pages/tags";

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: never) => key })
}));

beforeEach(() => {
  cleanup();
});

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost:8000',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('axios');

jest.mock('~/shared/api/store', () => ({
  tagsStore: {
    tags: [
      { id: 1, title_ky: 'Tag 1', title_ru: 'Тег 1', title_en: 'Tag 1', active: true },
      { id: 2, title_ky: 'Tag 2', title_ru: 'Тег 2', title_en: 'Tag 2', active: false },
    ],
    fetchTags: jest.fn(),
    setChangeStatusesSuccess: jest.fn(),
    setCreateTagSuccess: jest.fn(),
    setUpdateSuccess: jest.fn(),
    selectedTag: null,
    createTagSuccess: false,
    changeTagsStatuses: jest.fn().mockImplementation(() => ({
      bind: jest.fn().mockImplementation(() => {
        return function() {
        };
      })
    })),
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

  test('Changing create/update tag modal form', async () => {
    const handleTagOkCancel = jest.fn();

    render(
      <CreateEditTagModal handleTagOkCancel={handleTagOkCancel} creating textTitle='Creating new tag test' />
    );

    const name_in_kyrgyz = screen.getByLabelText('tags.name_in_kyrgyz');
    const name_in_russian = screen.getByLabelText('tags.name_in_russian');
    const name_in_eng = screen.getByLabelText('tags.name_in_eng');
    const button = await screen.findByRole('button', { name: 'merchants.create' });

    await act(async () => {
      fireEvent.change(name_in_kyrgyz, { target: { value: 'test_tag' } });
      fireEvent.change(name_in_russian, { target: { value: 'test_tag' } });
      fireEvent.change(name_in_eng, { target: { value: 'test_tag' } });
      fireEvent.click(button);
    });
  });

  test('Changing create/update tag modal form with mocked selectedTag', async () => {
    const handleTagOkCancel = jest.fn();

    const mockedSelectedTag = {
      id: 1,
      title_ky: 'Mocked Tag',
      title_ru: 'Моковый тег',
      title_en: 'Mock Tag',
      active: true,
    };

    render(
      <CreateEditTagModal handleTagOkCancel={handleTagOkCancel} textTitle='Updating tag test' selectedTag={mockedSelectedTag} />
    );
    const name_in_kyrgyz = screen.getByLabelText('tags.name_in_kyrgyz');
    const name_in_russian = screen.getByLabelText('tags.name_in_russian');
    const name_in_eng = screen.getByLabelText('tags.name_in_eng');
    const button = await screen.findByRole('button', { name: 'tags.save' });

    await act(async () => {

      await waitFor(() => {
        expect(name_in_kyrgyz.value).toBe(mockedSelectedTag.title_ky);
        expect(name_in_russian.value).toBe(mockedSelectedTag.title_ru);
        expect(name_in_eng.value).toBe(mockedSelectedTag.title_en);
      });

      fireEvent.change(name_in_kyrgyz, { target: { value: 'updated_tag' } });
      fireEvent.change(name_in_russian, { target: { value: 'updated_tag' } });
      fireEvent.change(name_in_eng, { target: { value: 'updated_tag' } });

      fireEvent.click(button);
    });
  });
});
