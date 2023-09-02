import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MockifyButton from "components/commons/Button/Button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IFetchedUserData } from "types/User";


const UserColumns: ColumnsType<IFetchedUserData> = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Username'.toUpperCase(),
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email'.toUpperCase(),
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role'.toUpperCase(),
    key: 'role',
    dataIndex: 'role',
    render: (_, { role }) => (
      <Tag color='geekblue' key={role}>
        {role.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Created at'.toUpperCase(),
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Created By'.toUpperCase(),
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: 'Action'.toUpperCase(),
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <MockifyButton 
          icon={<EditOutlined />}
          classes={['table-action-primary']}
          onClick={() => console.log('click update')} />
        <MockifyButton 
          icon={<DeleteOutlined />}
          classes={['table-action-secondary']}
          onClick={() => console.log('click delete')} />
      </Space>
    ),
  },
];

export default UserColumns;