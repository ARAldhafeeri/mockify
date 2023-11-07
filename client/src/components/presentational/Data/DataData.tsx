import type { ColumnsType } from 'antd/es/table';
import { IField } from 'types/Resource';

const ColumnsWithActions = (data : any) : ColumnsType => {
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
              {Object.keys(data).map((key : string) => {
                return (
                  <p key={key}>
                    {key} {"->"} {data[key ]}
                  </p>
                );
              })}
            </>
          ),
        },
      ];
}

export default ColumnsWithActions;