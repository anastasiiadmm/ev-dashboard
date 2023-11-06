import React from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import Create from "../../src/features/merchants/Create/Create";

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

beforeEach(() => {
  cleanup();
  jest.mock('../../src/features/merchants/Create/Create', () => ({
    countries: mockCountries,
    districts: mockDistricts,
    settlements: mockSettlements,
    countriesLoading: false,
    districtsLoading: false,
    settlementsLoading: false,
  }));
});

window.matchMedia = window.matchMedia || function(query) {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    media: query,
    onchange: null,
    dispatchEvent: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as unknown as MediaQueryList;
};

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost/8000',
}));

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),

  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  },

  Trans: ({ children }) => children,
}));

describe('Create Merchant UI Component', () => {
  it('renders and interacts correctly', async () => {

    const { getByTestId } = render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    expect(getByTestId('create-component')).toBeInTheDocument();
    const name = screen.getByLabelText('Наименование');
    const document = screen.getByLabelText('№ договора');
    const legal_name = screen.getByLabelText('Юридическое лицо');
    const rate = screen.getByLabelText('% по агентскому договору');
    const phone = screen.getByLabelText('Телефон');
    const email = screen.getByLabelText('Ваш email');
    const button = await screen.findByRole('button', { name: 'Далее' });
    const countrySelect = screen.getByLabelText('Страна');
    const districtSelect = screen.getByLabelText('Район');
    const settlementSelect = screen.getByLabelText('Город');
    const address = screen.getByLabelText('Улица');

    await waitFor(async () => {
      fireEvent.change(name, { target: { value: 'Test' } });
      fireEvent.change(document, { target: { value: 'Test' } });
      fireEvent.change(legal_name, { target: { value: 'Test' } });
      fireEvent.change(rate, { target: { value: '22' } });
      fireEvent.change(phone, { target: { value: '+996555555555' } });
      fireEvent.change(email, { target: { value: 'test@gmail.com' } });
      expect(countrySelect).toBeInTheDocument();
      expect(districtSelect).toBeInTheDocument();
      expect(settlementSelect).toBeInTheDocument();
      fireEvent.change(address, { target: { value: 'Test address' } });
      fireEvent.click(button);
    });
  });
});
