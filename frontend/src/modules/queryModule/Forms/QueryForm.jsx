import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, Row, Col } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import useLanguage from '@/locale/useLanguage';

export default function QueryForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="customer"
            label={translate('Customer')}
            rules={[
              {
                required: true,
                message: 'Please select a customer!',
              },
            ]}
            initialValue={current ? current.customer._id : undefined}
          >
            <AutoCompleteAsync
              entity={'client'}
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={'Add New Client'}
              withRedirect
              urlToRedirect={'/customer'}
              value={current ? current.customer._id : undefined}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="description"
            label={translate('Description')}
            rules={[
              {
                required: true,
                message: 'Please enter a description!',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="status"
            label={translate('Status')}
            rules={[
              {
                required: true,
                message: 'Please select a status!',
              },
            ]}
            initialValue={'Open'}
          >
            <Select
              options={[
                { value: 'Open', label: translate('Open') },
                { value: 'InProgress', label: translate('In Progress') },
                { value: 'Closed', label: translate('Closed') },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="resolution"
            label={translate('Resolution')}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
