import bem from 'easy-bem';
import { Button, Col, Form, Row, Typography } from 'antd';
import React, { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logo } from '~/assets/images';
import { IUser } from '~/pages/auth/interfaces/IUser';
import { authStore } from '~/shared/api/store';
import { FormField } from '~/shared/ui';
import '~/pages/auth/Auth/Auth.scss';

const { Text } = Typography;

const Auth = observer(() => {
  const b = bem('Auth');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(true);

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onFinish = async (values: IUser) => {
    await authStore.loginUser(values);
    if (authStore.success) {
      navigate('/');
    }
  };

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <div className={b('auth-block')}>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 24, offset: 2 }} lg={{ span: 22, offset: 1 }}>
          <div>
            <img src={logo} alt='logo' className={b('logo-image')} />
            <div>
              <Row className={b('buttons-row')}>
                <Text strong className={b('title')}>
                  {t('login.sign_in')}
                </Text>
                <Link to='/reset-password'>
                  <Button type='link' className={b('register-button')}>
                    {t('login.forgot_password')}
                  </Button>
                </Link>
              </Row>

              <Form
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
                size='large'
              >
                <FormField
                  data-testid='email_id_login'
                  type='email'
                  id='email_id'
                  name='email'
                  placeholder={t('login.email')}
                  rules={[
                    {
                      type: 'email',
                      message: t('errors.the_input_is_not_valid_email'),
                    },
                    {
                      required: true,
                      message: t('errors.enter_your_email_address'),
                    },
                  ]}
                />

                <FormField
                  data-testid='password_id'
                  type='password'
                  name='password'
                  placeholder={t('login.your_password')}
                />

                <FormField
                  className='checkbox-styles'
                  id='remember_id'
                  type='checkbox'
                  label={<span style={{ color: '#59647A' }}>{t('login.remember_me')}</span>}
                  valuePropName='password'
                  checked={checked}
                  onChange={onChangeCheckbox}
                />

                <Button
                  loading={authStore.loading}
                  type='primary'
                  htmlType='submit'
                  className={b('login-button')}
                >
                  {t('login.sign_in_button')}
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
});

export default Auth;
