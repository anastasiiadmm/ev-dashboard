import React from 'react';
import { Route, Routes } from 'react-router';
import { observer } from 'mobx-react-lite';

import Auth from '~/features/auth/Auth';
import '~/app/styles/_mixins.scss';

const App: React.FC = observer(() => {
  return <Routes>{<Route path='*' element={<Auth />} />}</Routes>;
});

export default App;
