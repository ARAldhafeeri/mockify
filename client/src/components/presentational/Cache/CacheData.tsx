import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';

const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
    {
      title: 'key'.toUpperCase(),
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'value'.toUpperCase(),
      dataIndex: 'value',
      key: 'value',
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