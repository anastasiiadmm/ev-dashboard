import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import '~/shared/ui/components/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
