import React from 'react';
import { screen, render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from '~/shared/locales/translationEN.json';
import translationRU from '~/shared/locales/translationRU.json';
import translationKY from '~/shared/locales/translationKY.json';

import Create from "../../src/features/merchants/Create/Create";
import { merchantStore } from "../../src/shared/api/store";

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

const resources = {
  en: {
    translation: translationEN,
  },
  ru: { translation: translationRU },
  ky: { translation: translationKY },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  });

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

beforeEach(() => {
  jest.spyOn(merchantStore, 'postCreateMerchant').mockImplementation(() => Promise.resolve({ merchantStore: {
      postCreateMerchant: jest.fn().mockImplementation(() => Promise.resolve({
        name: 'Test Name',
        agreementNumber: '1234',
      }))
    } }));
});

afterEach(() => {
  jest.restoreAllMocks();
});


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
    const countrySelect = screen.getByLabelText('Страна');
    const districtSelect = screen.getByLabelText('Район');
    const settlementSelect = screen.getByLabelText('Город');
    const address = screen.getByLabelText('Улица');
    const button = await screen.findByRole('button', { name: 'Далее' });

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

  test('displays error message on form submission failure', async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    await waitFor( async () => {
      fireEvent.change(screen.getByLabelText('Наименование'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByLabelText('№ договора'), { target: { value: '1234' } });
      fireEvent.change(screen.getByLabelText('Юридическое лицо'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByLabelText('% по агентскому договору'), { target: { value: 'Test Name' } });
      fireEvent.change(screen.getByLabelText('Телефон'), { target: { value: '+996555555555' } });
      fireEvent.change(screen.getByLabelText('Ваш email'), { target: { value: 'test@gmail.com' } });
      fireEvent.change(screen.getByLabelText('Улица'), { target: { value: 'Test address' } });
      fireEvent.click(screen.getByRole('button', { name: 'Далее' }));
      expect(await screen.getByText('Одно или несколько из обязательных полей не заполнено или содержит неверные данные, проверьте введенные данные.')).toBeInTheDocument();
    });
  });
});
