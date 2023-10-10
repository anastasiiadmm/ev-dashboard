import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import App from '~/app/App.tsx';
import '~/app/styles/index.scss';
import '~/app/styles/_mixins.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#22A699',
          colorTextLabel: '#323232',
        },
      }}
    >
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
);
