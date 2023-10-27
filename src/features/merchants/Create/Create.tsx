import React from 'react';
import bem from 'easy-bem';
import { Button, Form, Radio, Typography } from 'antd';

import { eng, kg, rus } from '~/assets/images';
import { BreadcrumbComponent, CardComponent, FormField } from '~/shared/ui/components';
import './Create.scss';

const { Title, Text } = Typography;

const languageItems = [
  { name: 'Кыргызский', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', lang: 'Орусча', icon: rus },
  { name: 'Английский', lang: 'Англисча', icon: eng },
];

const Create = () => {
  const b = bem('Create');
  const [form] = Form.useForm();

  const items = [
    { title: 'Мерчанты', href: '/merchants' },
    { title: 'Создание мерчанта', href: '/create-merchant' },
  ];

  const onFinish = () => {};

  return (
    <div className={b('')}>
      <BreadcrumbComponent items={items} />
      <div className={b('cards-block')}>
        <CardComponent>
          <Title level={3} style={{ margin: 0 }}>
            Создание мерчанта
          </Title>

          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            size='middle'
          >
            <p className={b('info')}>Информация о мерчанте</p>
            <div className={b('display-block')}>
              <div>
                <FormField
                  data-testid='name_id'
                  id='name_id'
                  name='name'
                  placeholder='Наименование'
                  label='Наименование'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />

                <FormField
                  data-testid='document_id'
                  id='document_id'
                  name='document'
                  placeholder='№ договора'
                  label='№ договора*'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </div>
              <div>
                <FormField
                  data-testid='entity_id'
                  id='entity_id'
                  name='entity'
                  placeholder='Юридическое лицо'
                  label='Юридическое лицо'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />

                <FormField
                  data-testid='percent_id'
                  id='percent_id'
                  name='percent'
                  placeholder='% по агентскому договору'
                  label='% по агентскому договору'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </div>
            </div>

            <p className={b('info')}>Контакты</p>
            <div className={b('display-block')}>
              <FormField
                type='phone'
                data-testid='phone_id'
                id='phone_id'
                name='phone'
                placeholder='Телефон'
                label='Телефон'
                rules={[
                  {
                    required: true,
                  },
                ]}
              />

              <FormField
                data-testid='email_id_login'
                type='email'
                id='email_id'
                name='email'
                label='Ваш email'
                placeholder='Введите email'
              />
            </div>

            <p className={b('info')}>Локация</p>
            <div className={b('display-block')}>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='name_id'
                  id='name_id'
                  name='name'
                  placeholder='Наименование'
                  label='Наименование'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />

                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='document_id'
                  id='document_id'
                  name='document'
                  placeholder='№ договора'
                  label='№ договора*'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </div>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='entity_id'
                  id='entity_id'
                  name='entity'
                  placeholder='Юридическое лицо'
                  label='Юридическое лицо'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />

                <FormField
                  data-testid='district_id'
                  id='district_id'
                  name='district'
                  placeholder='Улица'
                  label='Улица'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </div>
            </div>

            <FormField
              type='switch'
              data-testid='switch_id'
              id='switch_id'
              name='switch'
              text='Активный'
              label='Статус'
            />
          </Form>
        </CardComponent>
        <CardComponent style={{ width: 310 }}>
          <Title level={4} style={{ margin: 0 }}>
            Данные нужно указать на нескольких языках
          </Title>
          <Text style={{ marginBottom: 20 }}>Это нужно и описание почему так нужно сделать</Text>
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
            size='middle'
          >
            {languageItems.map((item) => {
              return (
                <CardComponent className={b('language-item')}>
                  <img src={item.icon} alt={item.name} />
                  <div className={b('button-info')}>
                    <Text style={{ margin: 0 }}>{item.name}</Text>
                    <Text type='secondary' style={{ margin: 0 }}>
                      {item.lang}
                    </Text>
                  </div>
                  <Radio />
                </CardComponent>
              );
            })}
            <div className={b('button-block')}>
              <Button type='primary'>Далее</Button>
              <Button type='default' className={b('cancel-button')}>
                Отменить
              </Button>
            </div>
          </Form>
        </CardComponent>
      </div>
    </div>
  );
};

export default Create;
