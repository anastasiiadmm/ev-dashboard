import bem from 'easy-bem';
import { Button, Col, Form, Row, Typography } from 'antd';
import { useState, ChangeEvent } from 'react';

import logo from '~/assets/images/logo.svg';
import FormField from '~/shared/ui/components/FormFIeld/FormField';
import '~/features/auth/Auth.scss';

const { Text } = Typography;

const Auth = () => {
  const b = bem('Auth');
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(true);

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onFinish = async () => {};

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
                <Button type='link' className={b('register-button')}>
                  Забыли пароль?
                </Button>
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
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Заполните логин',
                    },
                  ]}
                  placeholder='Логин'
                />

                <FormField
                  data-testid='password_id'
                  type='password'
                  name='password'
                  placeholder='Пароль'
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

                <Button disabled type='primary' htmlType='submit' className={b('login-button')}>
                  Войти
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default Auth;
