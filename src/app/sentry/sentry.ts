import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const { VITE_API_SENTRY_DSN } = import.meta.env;

const initSentry = () => {
  if (VITE_API_SENTRY_DSN) {
    Sentry.init({
      dsn: VITE_API_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};

export default initSentry;
