import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
import {
  EyeInvisibleOutlined
} from '@ant-design/icons';

const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
    {
      title: 'name'.toUpperCase(),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'apiKey'.toUpperCase(),
      dataIndex: 'apiKey',
      key: 'apiKey',
      render: (apiKey : string) => (
        <Tooltip title={apiKey}><EyeInvisibleOutlined /></Tooltip>
      ),
    },
    {
      title: 'user'.toUpperCase(),
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: 'Action'.toUpperCase(),
      key: 'action',
      render: (_ : any, record : any) => (
        <TableActions record={record} actions={actions} />
      ),
    },
  ];
}

export default ColumnsWithActions;