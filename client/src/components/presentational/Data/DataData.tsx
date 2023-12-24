import { Descriptions, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
const ColumnsWithActions = (data : any, actions : Array<Object>) : ColumnsType => {
  return [
        {
          title : "data".toUpperCase(),
          dataIndex: "data",
          key: "data",
          render: (data : any, _ : any, index : number) => (
            <Descriptions
            key={index}
            column={1}
            size="middle"
            layout="horizontal"
            >
              {Object.keys(data ?? {}).map((key : string) => {
                return (
                  <Descriptions.Item label={key}>
                   <Tag color="green">{data[key]}</Tag>
                  </Descriptions.Item>

                );
              })}
            </Descriptions>
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