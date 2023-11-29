import React from 'react';
import { render, cleanup, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';

import { merchantStore } from "../../src/shared/api/store";
import CreateEdit from "../../src/pages/merchants/CreateEdit/CreateEdit";

const mockCountries = [
  { id: '1', name: 'Country1' },
  { id: '2', name: 'Country2' },
];

const mockDistricts = [
  { id: '1', name: 'Country1' },
  { id: '2', name: 'Country2' },
];

const mockSettlements = [
  { id: '1', name: 'Country1' },
  { id: '2', name: 'Country2' },
];

beforeAll(() => {
  process.env.NODE_ENV = 'development';
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeEach(() => {
  cleanup();
  jest.mock('../../src/pages/merchants/CreateEdit/CreateEdit', () => ({
    countries: mockCountries,
    districts: mockDistricts,
    settlements: mockSettlements,
    countriesLoading: false,
    districtsLoading: false,
    settlementsLoading: false,
  }));
  jest.spyOn(merchantStore, 'postCreateMerchant').mockImplementation(() =>
    Promise.resolve({
      name: 'Test Name',
      agreementNumber: '1234',
    })
  );
});

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'development',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Create Merchant UI Component', () => {
  it('renders and interacts correctly', async () => {

    const { getByTestId } = render(
      <BrowserRouter>
        <CreateEdit />
      </BrowserRouter>
    );

    expect(getByTestId('create-component')).toBeInTheDocument();
    const name = screen.getByLabelText('merchants.name');
    const document = screen.getByLabelText('merchants.agreement_number');
    const legal_name = screen.getByLabelText('merchants.entity_full');
    const rate = screen.getByLabelText('merchants.under_agency_agreement');
    const phone = screen.getByLabelText('merchants.phone');
    const email = screen.getByLabelText('merchants.your_email');
    const countrySelect = screen.getByLabelText('merchants.country');
    const settlementSelect = screen.getByLabelText('merchants.city');
    const address = screen.getByLabelText('merchants.street');
    const button = await screen.findByRole('button', { name: 'merchants.further' });

    await waitFor(async () => {
      fireEvent.change(name, { target: { value: 'Test' } });
      fireEvent.change(document, { target: { value: 'Test' } });
      fireEvent.change(legal_name, { target: { value: 'Test' } });
      fireEvent.change(rate, { target: { value: '22' } });
      fireEvent.change(phone, { target: { value: '+996555555555' } });
      fireEvent.change(email, { target: { value: 'test@gmail.com' } });
      expect(countrySelect).toBeInTheDocument();
      expect(settlementSelect).toBeInTheDocument();
      fireEvent.change(address, { target: { value: 'Test address' } });
      fireEvent.click(button);
    });
  });

  it('renders with correct language options', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CreateEdit />
      </BrowserRouter>
    );

    const languageOptions = ['Кыргызский', 'Русский', 'Английский'];
    languageOptions.forEach((language: string) => {
      expect(getByText(language as HTMLInputElement)).toBeInTheDocument();
    });
  });
});
