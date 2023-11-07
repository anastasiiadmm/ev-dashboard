import React, { useState } from 'react';
import bem from 'easy-bem';
import { Button, Col, Form, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logo } from '~/assets/images';
import { FormField } from '~/shared/ui';
import './ResetPassword.scss';

const { Text } = Typography;

const ResetPassword = () => {
  const b = bem('ResetPassword');
  const { t } = useTranslation();
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
                  {t('change_password.information_about_resetting_your_password')}
                </Text>
                <Text className={b('title')}>
                  {t('change_password.go_to_your_email_to_continue_the_password_reset_procedure')}
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
                  {t('change_password.password_recovery')}
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
                      message: t('errors.the_input_is_not_valid_email'),
                    },
                    {
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('errors.the_input_is_not_valid_email'),
                    },
                  ]}
                  placeholder={t('login.email')}
                />

                <Button type='primary' htmlType='submit' className={b('login-button')}>
                  {t('login.continue')}
                </Button>
                <Link to='/'>
                  <Button type='link' className={b('back-button')}>
                    {t('login.back')}
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
