import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Invisible } from 'components/commons/Invisible/Invisible';
import TableActions from 'components/commons/TableActions/TableActions';

const ColumnsWithActions = (actions : any) : ColumnsType => {
  return  [
    {
      title: 'method'.toUpperCase(),
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'url'.toUpperCase(),
      key: 'url',
      dataIndex: 'endpoint',
      render: (endpoint : string) => Invisible(endpoint)
    },
    {
      title: 'params'.toUpperCase(),
      key: 'params',
      dataIndex: 'params',
      render: (params : Array<string>) => (
        <>
          {params.map((name : String, index : number) =>{
            return (
              <Tag color={"green"} key={index}>
                {name}
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