import { Button, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableActions from 'components/commons/TableActions/TableActions';
import {
  EyeInvisibleOutlined,
  CopyOutlined
} from '@ant-design/icons';
import MockifyButton from 'components/commons/Button/Button';

const apiKeyWithTooltipClick = (apiKey : string) => {
  return (
    <div>
      <p style={{marginTop: "23px"}}>{apiKey}</p>
      <MockifyButton 
      icon={<CopyOutlined style={{fontSize: "20px"}} />} 
      onClick={() => navigator.clipboard.writeText(apiKey)}
      classes={['copy-api-key-btn']}
      />
    </div>
    )
}
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
        <Tooltip title={apiKeyWithTooltipClick(apiKey)}><EyeInvisibleOutlined /></Tooltip>
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