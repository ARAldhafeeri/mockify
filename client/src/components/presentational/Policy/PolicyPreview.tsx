import { Descriptions, Tag } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react'

interface IPolicyPreview {
  resources: Array<string>;
  roles: Array<string>;
  actions: Array<string>;
  policies: Array<{can: Array<string>, on: Array<string>, role: string}>;
}

interface IPolicyPreviewProps {
  data: IPolicyPreview
}

export default function PolicyPreview(props : IPolicyPreviewProps) {
  const { data } = props;
  return (
    <>
      <Typography className="policiesHeader">Policy</Typography>
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
      <Typography className="policiesHeader">User-defined policies</Typography>
      {data?.policies?.map((policy : any) => {
        return (
          <>
            <Descriptions
              bordered
              column={1}
              size="middle"
              layout="horizontal"
              style={{width: "100%", marginTop: "35px" }}
            >
              <Descriptions.Item label="role">
                {policy?.role}
              </Descriptions.Item>
              <Descriptions.Item label="resources">
                {policy?.on?.map((resource : string) => {
                  return <Tag color="green">{resource}</Tag>
                })}
              </Descriptions.Item>
              <Descriptions.Item label="actions">
                {policy?.can?.map((action : string) => {
                  return <Tag color="green">{action}</Tag>
                })}
              </Descriptions.Item>
            </Descriptions>
          </>
        )
      })}
    </>

  )
}
