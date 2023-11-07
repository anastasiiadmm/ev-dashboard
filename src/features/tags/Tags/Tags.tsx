import bem from 'easy-bem';
import { Button, Form, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { FormField } from '~/shared/ui';
import { add, search } from '~/assets/images';
import './Tags.scss';

const Tags = () => {
  const b = bem('Tags');

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row className={b('search-pagination-block')}>
        <div>
          <Form>
            <FormField
              style={{ width: 300 }}
              id='autocomplete_id'
              placeholder='Искать среди тегов'
              size='large'
              prefix={<img src={search} alt='search' />}
            />
          </Form>
        </div>
      </Row>
      <Row className={b('table-block')}>
        <Link to='/tags/create-tag' className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            Добавить тег
          </Button>
        </Link>
      </Row>
    </Row>
  );
};

export default Tags;
