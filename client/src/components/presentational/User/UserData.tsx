import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import UserTableActions from "./UserTableActions";


const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
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
      render: (_ : any, record : any ) => (
        <Tag color='geekblue' key={record.role}>
          {record.role.toUpperCase()}
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
      render: (_ : any, record : any) => (
        <UserTableActions record={record} actions={actions} />
      ),
    },
  ];
}

export default ColumnsWithActions;