import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
import { Invisible } from 'components/commons/Invisible/Invisible';


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
      render: (apiKey : string) => Invisible(apiKey)
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