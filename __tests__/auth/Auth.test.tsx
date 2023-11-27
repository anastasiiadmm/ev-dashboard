import React from 'react';
import { render, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';

import Auth from "../../src/pages/auth/Auth/Auth";

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'development',
}));

beforeAll(() => {
  process.env.NODE_ENV = 'development';
});

jest.mock('antd/lib/form/Form', () => {
  const actualForm = jest.requireActual('antd/lib/form/Form');
  return {
    ...actualForm,
    useForm: () => [{}, jest.fn()],
  };
});

jest.mock('../../src/pages/auth/Auth/Auth', () => () => <div>Mocked Auth</div>);

describe('tests for Auth ui',  () => {
  test('Render component toMatchSnapshot()', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );
    await act(async () => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
