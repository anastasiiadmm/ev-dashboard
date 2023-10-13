import React from 'react';
import bem from 'easy-bem';

import '~/features/main/Home/Home.scss';

const Home = () => {
  const b = bem('Home');

  return <div className={b('')}>Home</div>;
};

export default Home;
