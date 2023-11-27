import React from 'react';
import { act, render } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

import '../../__mocks__/react-i18next.mock';
import '../../__mocks__/matchMedia.mock';
import '../../__mocks__/i18nextMock';

import Merchant from "../../src/pages/merchants/Merchant/Merchant";

const mockMerchant = [
  {
    id: 0,
    number_stations: 0,
    active_stations: 0,
    inactive_stations: 0,
    created_by: "test",
    city_name: "test",
    country_name: "test",
    district_name: "test",
    created_at: "2019-08-24T14:15:22Z",
    name: "test",
    legal_name: "test",
    rate: "test",
    agreement_number: "test",
    address: "test",
    phone: "test",
    email: "user@example.com",
    active: true
  }
];

beforeAll(() => {
  process.env.NODE_ENV = 'development';
  jest.mock("~/shared/api/store", () => ({
    merchantStore: {
      getMerchantDetail: jest.fn(() => Promise.resolve(mockMerchant)),
      merchantDetail: mockMerchant,
    },
  }));
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('~/shared/utils/config', () => ({
  apiURL: 'development',
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Create Merchant UI Component', () => {
  test('Render component toMatchSnapshot()', async () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Merchant />
      </BrowserRouter>
    );
    await act(async () => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
