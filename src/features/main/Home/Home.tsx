import React, { useState } from 'react';
import bem from 'easy-bem';
import { Button, Divider, Typography } from 'antd';

import trendingUp from '~/assets/images/svg/icons/default/trending-up.svg';
import trendingDown from '~/assets/images/svg/icons/default/trending-down.svg';
import userGroup from '~/assets/images/svg/icons/default/user-group.svg';
import identification from '~/assets/images/svg/icons/default/identification.svg';
import CardComponent from '~/shared/ui/components/CardComponent/CardComponent';
import AnchorComponent from '~/shared/ui/components/AnchorComponent/AnchorComponent';
import ChartComponent from '~/shared/ui/components/ChartComponent/ChartComponent';
import '~/features/main/Home/Home.scss';
import TimelineComponent from '~/shared/ui/components/TimelineComponent/TimelineComponent';

const { Title, Text } = Typography;

const cardItems = [
  { id: 1, name: 'Новые мерчанты', amount: 120, percent: '+11.01%', icon: trendingUp },
  { id: 2, name: 'Новые станции', amount: 457, percent: '+11.01%', icon: trendingUp },
  { id: 3, name: 'Новые пользователи', amount: 156, percent: '-11.01%', icon: trendingDown },
  { id: 4, name: 'Новые акции', amount: 589, percent: '-11.01%', icon: trendingDown },
];

const items = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'Новые мерчанты',
  },
  {
    key: 'part-2',
    href: '#part-2',
    title: 'Новые станции',
  },
  {
    key: 'part-3',
    href: '#part-3',
    title: 'Новые пользователи',
  },
  {
    key: 'separator',
    isSeparator: true,
  },
  {
    key: 'this-week',
    href: '#this-week',
    title: 'Эта неделя',
  },
  {
    key: 'last-week',
    href: '#last-week',
    title: 'Предыдущая неделя',
  },
];

const cardInfoItems = [
  {
    id: 1,
    title: 'Заголовок',
    text: 'Как принято считать, ключевые особенности структуры проекта будут в равной степени предоставлены сами себе.',
    date: '17.07.2023 14-00',
    icon: trendingUp,
  },
  {
    id: 2,
    title: 'Заголовок',
    text: 'Как принято считать, ключевые особенности структуры проекта будут в равной степени предоставлены сами себе. ',
    date: '17.07.2023 14-00',
    icon: trendingUp,
  },
];

const timelineItems = [
  {
    dot: <img src={userGroup} alt='userGroup' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый пользователь</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18774</p>
      </div>
    ),
  },
  {
    dot: <img src={userGroup} alt='userGroup' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый пользователь</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18771</p>
      </div>
    ),
  },
  {
    dot: <img src={identification} alt='identification' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый мерчант</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18771</p>
      </div>
    ),
  },
  {
    dot: <img src={identification} alt='identification' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый мерчант</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18771</p>
      </div>
    ),
  },
  {
    dot: <img src={identification} alt='identification' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый мерчант</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18771</p>
      </div>
    ),
  },
  {
    dot: <img src={identification} alt='identification' />,
    children: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Text style={{ display: 'block' }}>Добавлен новый мерчант</Text>
        <p style={{ color: '#22A599', margin: 0 }}>#18771</p>
      </div>
    ),
  },
];

const Home = () => {
  const b = bem('Home');
  const [currentAnchor, setCurrentAnchor] = useState<string>('#part-1');

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLElement>,
    link: {
      title: string;
      href: string;
    },
  ) => {
    e.preventDefault();
    setCurrentAnchor(link.href);
  };

  return (
    <div className={b('')}>
      <div className={b('card-block')}>
        {cardItems.map((card) => {
          return (
            <CardComponent width={{ width: 256 }} key={card.id}>
              <Title level={5} style={{ margin: '0 0 8px 0' }}>
                {card.name}
              </Title>
              <div className={b('card-info')}>
                <Title level={4} style={{ margin: 0 }}>
                  {card.amount}
                </Title>
                <div className={b('card-amount')}>
                  <Text>{card.percent}</Text>
                  <img src={card.icon} alt='percent' />
                </div>
              </div>
            </CardComponent>
          );
        })}
      </div>

      <div className={b('anchor-component')}>
        <AnchorComponent
          items={items}
          handleAnchorClick={handleAnchorClick}
          currentAnchor={currentAnchor}
        />

        <div className={b('anchor-items')}>
          <div
            id='part-1'
            className={b('anchor-item')}
            style={{
              display: currentAnchor === '#part-1' ? 'block' : 'none',
            }}
          >
            <ChartComponent />
          </div>
          <div
            id='part-2'
            className={b('anchor-item')}
            style={{
              display: currentAnchor === '#part-2' ? 'block' : 'none',
            }}
          />
          <div
            id='part-3'
            className={b('anchor-item')}
            style={{
              display: currentAnchor === '#part-3' ? 'block' : 'none',
            }}
          />
          <div
            id='this-week'
            className={b('anchor-item')}
            style={{
              display: currentAnchor === '#this-week' ? 'block' : 'none',
            }}
          />
          <div
            id='last-week'
            className={b('anchor-item')}
            style={{
              display: currentAnchor === '#last-week' ? 'block' : 'none',
            }}
          />
        </div>
      </div>

      <div className={b('card-info-items')}>
        <CardComponent width={{ width: 640 }} className={b('card-text-block')}>
          <Title level={5} style={{ margin: '0 0 20px 0', textTransform: 'uppercase' }}>
            Текст
          </Title>
          {cardInfoItems?.map((card) => {
            return (
              <div key={card.id} className={b('card-info-block')}>
                <Title level={5} style={{ margin: '0 0 8px 0' }}>
                  {card.title}
                </Title>
                <Text style={{ margin: 0 }}>{card.text}</Text>
                <Text type='secondary'>{card.date}</Text>
                <Button type='link' style={{ textAlign: 'left', padding: 0 }}>
                  Читать далее
                </Button>
                <Divider style={{ margin: '20px 0' }} />
              </div>
            );
          })}
        </CardComponent>
        <CardComponent
          width={{ width: 550, height: 'fit-content' }}
          className={b('card-text-block')}
        >
          <Title level={5} style={{ margin: '0 0 20px 0', textTransform: 'uppercase' }}>
            Timeline
          </Title>
          <TimelineComponent items={timelineItems} />
        </CardComponent>
      </div>
    </div>
  );
};

export default Home;
