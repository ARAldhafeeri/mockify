import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
import { IField } from 'types/Resource';

const ColumnsWithActions = (data : any, actions : Array<Object>) : ColumnsType => {
  return [
        {
          title: "resource".toUpperCase(),
          dataIndex: "resource",
          key: "resource",
        }, 
        {
          title : "data".toUpperCase(),
          dataIndex: "data",
          key: "data",
          render: (data : any) => (
            <>
              {Object.keys(data ?? {}).map((key : string) => {
                return (
                  <p key={key}>
                    {key} {"->"} {data[key ]}
                  </p>
                );
              })}
            </>
          ),
        },
        {
          title: 'action'.toUpperCase(),
          key: 'action',
          render: (_ : any, record : any) => (
            <TableActions record={record} actions={actions} />
          ),
        },
      ];
}

export default ColumnsWithActions;