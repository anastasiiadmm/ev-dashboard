import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import Auth from "../../src/features/auth/Auth/Auth";

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost/8000',
}));

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

jest.mock('antd/lib/form/Form', () => {
  const actualForm = jest.requireActual('antd/lib/form/Form');
  return {
    ...actualForm,
    useForm: () => [{}, jest.fn()],
  };
});

jest.mock('../../src/features/auth/Auth/Auth', () => () => <div>Mocked Auth</div>);

describe('tests for Auth components',  () => {
  test('Render component toMatchSnapshot()', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
