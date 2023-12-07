import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import InfrastructureList from "../../src/pages/infrastructure/InfrastructureList/InfrastructureList";
import CreateEditInfrastructureModal
  from "../../src/pages/infrastructure/ui/Modals/CreateEditInfrastructureModal/CreateEditInfrastructureModal";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

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
  test('Render component toMatchSnapshot()', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <InfrastructureList />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

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

  test('Changing create/update infrastructure modal form', async () => {
    const handleTagOkCancel = jest.fn();

    render(
      <CreateEditInfrastructureModal handleTagOkCancel={handleTagOkCancel}
                                     creating loading={false} textTitle='Creating new infrastructure test'
      />
    );

    const name_in_kyrgyz = screen.getByLabelText('infrastructure.name_in_kyrgyz');
    const name_in_russian = screen.getByLabelText('infrastructure.name_in_russian');
    const name_in_eng = screen.getByLabelText('infrastructure.name_in_eng');
    const button = await screen.findByRole('button', { name: 'infrastructure.save' });

    await act(async () => {
      fireEvent.change(name_in_kyrgyz, { target: { value: 'test_infrastructure' } });
      fireEvent.change(name_in_russian, { target: { value: 'test_infrastructure' } });
      fireEvent.change(name_in_eng, { target: { value: 'test_infrastructure' } });
      fireEvent.click(button);
    });
  });
});
