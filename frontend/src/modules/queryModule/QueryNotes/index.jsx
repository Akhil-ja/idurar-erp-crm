import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Tooltip, Popconfirm, message, Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import useLanguage from '@/locale/useLanguage';
import queryRequest from '@/request/query';

const { TextArea } = Input;

const MemoizedNoteItem = React.memo(({ item, handleDeleteNote, translate }) => {
  return (
    <List.Item
      actions={[
        <Popconfirm
          title="Are you sure to delete this note?"
          onConfirm={() => handleDeleteNote(item._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        title={null} // Removed author display
        description={
          <Space direction="vertical">
            <Typography.Text>{item.content}</Typography.Text>
            <Tooltip title={dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')}>
              <Typography.Text type="secondary">{dayjs(item.date).fromNow()}</Typography.Text>
            </Tooltip>
          </Space>
        }
      />
    </List.Item>
  );
});

const QueryNotes = ({ queryId, notes, onNoteAdded, onNoteRemoved }) => {
  const translate = useLanguage();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const response = await queryRequest.addNote(queryId, { content: values.noteContent });
      if (response.success) {
        message.success('Note added successfully!');
        form.resetFields();
        onNoteAdded(response.result.notes);
      } else {
        message.error('Failed to add note.');
      }
    } catch (error) {
      message.error('Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = React.useCallback(async (noteId) => {
    try {
      const response = await queryRequest.removeNote(queryId, noteId);
      if (response.success) {
        message.success('Note removed successfully!');
        onNoteRemoved(response.result.notes);
      } else {
        message.error('Failed to remove note.');
      }
    } catch (error) {
      message.error('Failed to remove note.');
    }
  }, [queryId, onNoteRemoved]);

  return (
    <div>
      <h3>{translate('Notes')}</h3>
      <List
        className="comment-list"
        header={`${notes.length} ${translate('replies')}`}
        itemLayout="horizontal"
        dataSource={notes}
        renderItem={(item) => (
          <MemoizedNoteItem item={item} handleDeleteNote={handleDeleteNote} translate={translate} />
        )}
      />
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="noteContent">
          <TextArea rows={4} placeholder={translate('Add a note')} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={submitting} type="primary">
            {translate('Add Note')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QueryNotes;