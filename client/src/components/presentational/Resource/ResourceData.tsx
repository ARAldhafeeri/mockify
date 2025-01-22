import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';

const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
    {
      title: 'name'.toUpperCase(),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'features'.toUpperCase(),
      key: 'features',
      dataIndex: 'features',
      render: (features : Object) => (
        <>
          {Object.keys(features ?? {}).map((name : String, index : number) =>{
            let color = features[name as keyof typeof features] ? 'green' : 'red';
            return (
              <Tag color={color} key={index}>
                {name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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