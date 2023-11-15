import { Descriptions, Tag } from 'antd';
import React from 'react'

interface IPoliciesProps {
  policies : Array<{
    role : string,
    can : Array<string>,
    on : Array<string>,
    key?: string;
  }>
}
export default function Policies(props : IPoliciesProps) {
  const { policies } = props;
  return (
    <>
      {policies?.map((policy : {role : string, can : Array<string>, on : Array<string>}, index) => {
        return (
          <Descriptions
            key={index}
            bordered
            column={1}
            size="small"
            layout="horizontal"
            style={{width: "75%", marginTop: "35px"}}
          >
            <Descriptions.Item label="role">
              <Tag color="green">{policy.role}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="can">
              {policy.can.map((action : string) => {
                return <Tag color="green">{action}</Tag>
              })}
            </Descriptions.Item>
            <Descriptions.Item label="on">
              {policy.on.map((resource : string) => {
                return <Tag color="green">{resource}</Tag>
              })}
            </Descriptions.Item>
          </Descriptions>
        );
      })}
    </>
  )
}
