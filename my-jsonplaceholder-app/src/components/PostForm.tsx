import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';

interface PostFormProps {
  onPostAdded: (post: any) => void;
  onPostUpdated: (post: any) => void;
  editingPost?: any;
}

const PostForm: React.FC<PostFormProps> = ({ onPostAdded, onPostUpdated, editingPost }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      form.setFieldsValue(editingPost);
    } else {
      form.resetFields();
    }
  }, [editingPost, form]);

  const onFinish = async (values: { title: string; body: string }) => {
    setLoading(true);
    try {
      if (editingPost) {
        onPostUpdated({ ...editingPost, ...values });
        notification.success({
          message: 'Post Updated',
          description: `Post with ID ${editingPost.id} has been updated successfully!`,
        });
      } else {
        onPostAdded(values);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to process the form. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{editingPost ? 'Edit Post' : 'Add New Post'}</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please input the body!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {editingPost ? 'Update Post' : 'Add Post'}
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
