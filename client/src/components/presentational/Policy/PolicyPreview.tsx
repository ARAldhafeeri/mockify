import { Descriptions, Tag } from 'antd';
import React from 'react'

interface IPolicyPreview {
  resources: Array<string>;
  roles: Array<string>;
  actions: Array<string>;
}

interface IPolicyPreviewProps {
  data: IPolicyPreview
}

export default function PolicyPreview(props : IPolicyPreviewProps) {
  const { data } = props;
  console.log("preview data", data)
  return (
    <Descriptions
      bordered
      column={1}
      size="middle"
      layout="horizontal"
      style={{width: "100%", marginTop: "35px" }}
    >
      <Descriptions.Item label="roles">
      {data?.roles?.map((role : string) => {
        return <Tag color="green">{role}</Tag>
      })}
      </Descriptions.Item>
      <Descriptions.Item label="resources">
        {data?.resources?.map((resource : string) => {
          return <Tag color="green">{resource}</Tag>
        })}
      </Descriptions.Item>
      <Descriptions.Item label="actions">
        {data?.actions?.map((action : string) => {
          return <Tag color="green">{action}</Tag>
        })}
      </Descriptions.Item>
    </Descriptions>
  )
}
