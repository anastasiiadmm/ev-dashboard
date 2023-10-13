import '@testing-library/jest-dom';
import { defaultTokens } from '~/shared/utils/storage';

import AuthStore from "../../src/features/auth/store/authModel/authModel";

jest.mock('~/shared/utils/config', () => ({
    apiURL: 'http://localhost/8000',
}));

beforeAll(() => {
    process.env.NODE_ENV = 'test';
});

jest.mock('~/shared/utils/mobx-api', () => ({
    post: jest.fn(),
}));

describe('MobX AuthStore', () => {

    beforeEach(() => {
        AuthStore.tokens = defaultTokens;
        AuthStore.user = null;
        AuthStore.loading = false;
        AuthStore.success = false;
        AuthStore.error = null;
        AuthStore.commonError = null;
    });

    it('should logout user and reset state', () => {
        AuthStore.logoutUser();

        expect(AuthStore.tokens).toEqual(defaultTokens);
        expect(AuthStore.user).toBeNull();
        expect(AuthStore.loading).toBeFalsy();
        expect(AuthStore.success).toBeFalsy();
        expect(AuthStore.error).toBeNull();
    });
});
