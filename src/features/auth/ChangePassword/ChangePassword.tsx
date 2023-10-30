import React from 'react';
import { Button, Col, Form, Row, Typography } from 'antd';
import bem from 'easy-bem';

import { logo } from '~/assets/images';
import { FormField } from '~/shared/ui';

const { Text } = Typography;

const ChangePassword = () => {
  const b = bem('ResetPassword');
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <div className={b('auth-block')}>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 24, offset: 2 }} lg={{ span: 22, offset: 1 }}>
          <div>
            <img src={logo} alt='logo' className={b('logo-image')} />
            <div>
              <Row className={b('buttons-row')}>
                <Text strong className={b('title')}>
                  Создайте новый пароль
                </Text>
              </Row>

              <Form
                scrollToFirstError
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
                size='large'
              >
                <FormField
                  data-testid='password_id'
                  type='password'
                  name='password'
                  placeholder='Ваш пароль'
                />

                <FormField
                  hasFeedback
                  data-testid='password_id'
                  type='password'
                  name='confirm_password'
                  dependencies={['password']}
                  placeholder='Повторите пароль'
                />

                <Button type='primary' htmlType='submit' className={b('login-button')}>
                  Продолжить
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default ChangePassword;
