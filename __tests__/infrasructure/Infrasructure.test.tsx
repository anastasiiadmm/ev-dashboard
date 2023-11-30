import React from 'react';
import { act, render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import InfrastructureList from "../../src/pages/infrastructure/InfrastructureList/InfrastructureList";

const mockInfrastructure = [
  {
    id: 6,
    icon_path: '/app/media/surrounding/pharmacy.png',
    title_ru: 'Аптека',
    title_en: 'Аптека',
    title_ky: 'Аптека',
    active: true,
  }
];

beforeAll(() => {
  process.env.NODE_ENV = 'development';
  jest.mock("~/shared/api/store", () => ({
    infrastructureStore: {
      fetchInfrastructure: jest.fn(() => Promise.resolve(mockInfrastructure)),
      infrastructure: mockInfrastructure,
    },
  }));
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost:8000',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Infrastructure UI Component', () => {
  test('renders Infrastructure data table correctly', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <InfrastructureList />
      </BrowserRouter>
    );

    await act(async () => {
      expect(getByTestId('infrastructure-component')).toBeInTheDocument();
    });
  });
});
