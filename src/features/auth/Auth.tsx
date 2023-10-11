import bem from 'easy-bem';
import { Button, Col, Form, Row, Typography } from 'antd';
import { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';
import FormField from '~/shared/ui/components/FormFIeld/FormField';
import '~/features/auth/Auth.scss';
import { authStore } from '~/shared/api/store';
import { IUser } from '~/features/auth/interfaces/IUser';

const { Text } = Typography;

const Auth = observer(() => {
  const b = bem('Auth');
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
                  Авторизация
                </Text>
                <Link to='/reset-password'>
                  <Button type='link' className={b('register-button')}>
                    Забыли пароль?
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
                  rules={[
                    {
                      required: true,
                      message: 'Неверный адрес электронной почты',
                    },
                    {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Неверный адрес электронной почты',
                    },
                  ]}
                  placeholder='Электронная почта'
                />

                <FormField
                  data-testid='password_id'
                  type='password'
                  name='password'
                  placeholder='Ваш пароль'
                />

                <FormField
                  className='checkbox-styles'
                  id='remember_id'
                  type='checkbox'
                  label={<span style={{ color: '#59647A' }}>Запомнить меня</span>}
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
                  Войти
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
