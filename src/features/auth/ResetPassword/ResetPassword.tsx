import React, { useState } from 'react';
import bem from 'easy-bem';
import { Button, Col, Form, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';
import FormField from '~/shared/ui/components/FormFIeld/FormField';
import '~/features/auth/ResetPassword/ResetPassword.scss';

const { Text } = Typography;

const ResetPassword = () => {
  const b = bem('ResetPassword');
  const [form] = Form.useForm();
  const [showSuccessComponent, setShowSuccessComponent] = useState(false);

  const onFinishFailed = () => {
    setShowSuccessComponent(false);
  };

  const onFinish = () => {
    setShowSuccessComponent(true);
  };

  if (showSuccessComponent) {
    return (
      <Row justify='space-between' data-testid='auth-component' className={b()}>
        <div className={b('auth-block')}>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 2 }}
            lg={{ span: 22, offset: 1 }}
          >
            <div>
              <img src={logo} alt='logo' className={b('logo-image')} />
              <div className={b('success-block')}>
                <Text className={b('title')}>
                  На вашу почту <b>joe@mail.com</b> было отправлено письмо с информацией о сбросе
                  пароля.
                </Text>
                <Text className={b('title')}>
                  Перейдите в свою почту, чтобы продолжить процедуру сброса пароля.
                </Text>
              </div>
            </div>
          </Col>
        </div>
      </Row>
    );
  }

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <div className={b('auth-block')}>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 24, offset: 2 }} lg={{ span: 22, offset: 1 }}>
          <div>
            <img src={logo} alt='logo' className={b('logo-image')} />
            <div>
              <Row className={b('buttons-row')}>
                <Text strong className={b('title')}>
                  Восстановление пароля
                </Text>
              </Row>

              <Form
                scrollToFirstError
                form={form}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
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

                <Button type='primary' htmlType='submit' className={b('login-button')}>
                  Продолжить
                </Button>
                <Link to='/'>
                  <Button type='link' className={b('back-button')}>
                    Назад
                  </Button>
                </Link>
              </Form>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default ResetPassword;
