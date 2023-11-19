import { DescriptionsProps, Tag, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
import { IField } from 'types/Resource';

const ColumnsWithActions = (actions : Array<Object>) : ColumnsType => {
  return [
        {
          title : "resources".toUpperCase(),
          dataIndex: "resources",
          key: "resources",
          render: (resources : Array<string>) => (
            <>
              {resources?.map((res : string) => {
                return <Tag color="green" key={res}>{res}</Tag>
              })}
            </>
          ),
        },
        {
          title : "actions".toUpperCase(),
          dataIndex: "actions",
          key: "actions",
          render: (actions : Array<string>) => (
            <>
              {actions?.map((action : string) => {
                return <Tag color="green" key={action}>{action}</Tag>
              })}
            </>
          ),
        },
        {
          title : "roles".toUpperCase(),
          dataIndex: "roles",
          key: "roles",
          render: (roles : Array<string>) => (
            <>
              {roles?.map((role : string) => {
                return <Tag color="green" key={role}>{role}</Tag>
              })}
            </>
          ),
        },
        {
          title : "createdAt".toUpperCase(),
          dataIndex: "createdAt",
          key: "createdAt",
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