import React from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface PostTableProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (id: number) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text: number) => <b>{text}</b>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span style={{ color: '#1890ff' }}>{text}</span>,
    },
    {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',
        render: (text: string) => (
          <Tooltip title={text}>
            <div
              style={{
                maxWidth: '300px', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
              }}
            >
              {text}
            </div>
          </Tooltip>
        ),
      },      
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Edit Post">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Post">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const rowClassName = (record: any, index: number) => 
    index % 2 === 0 ? 'table-row-light' : 'table-row-dark';

  return (
    <Table
      dataSource={posts}
      columns={columns}
      rowClassName={rowClassName}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
};

export default PostTable;
