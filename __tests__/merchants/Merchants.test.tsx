import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';
import Merchants from "../../src/features/merchants/Merchants/Merchants";

const mockMerchants = [
  {
    active: false,
    active_stations: 3,
    address: "test",
    agreement_number: "test",
    email: "test@gmail.com",
    id: 25,
    inactive_stations: 0,
    legal_name: "test",
    location: "Кыргызстан, Ат-Баши, Токтогульский, test",
    name: "test",
    number_stations: 3,
    phone: "+444 (444) 44-44-44",
    rate: "2.00"
  }
];

beforeAll(() => {
  process.env.NODE_ENV = 'http://localhost/:8000/';
  jest.mock("~/shared/api/store", () => ({
    merchantStore: {
      fetchMerchants: jest.fn(() => Promise.resolve(mockMerchants)),
      merchants: mockMerchants,
      changeMerchantsStatuses: jest.fn().mockImplementation(() => {
      }),
      setChangeStatusesSuccess: jest.fn(),
    },
  }));
});


jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'http://localhost/:8000/',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Create Merchant UI Component', () => {
  test('Render component toMatchSnapshot()', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Merchants />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders merchant data correctly', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Merchants />
      </BrowserRouter>
    );

    expect(getByTestId('merchants-component')).toBeInTheDocument();
  });
});
