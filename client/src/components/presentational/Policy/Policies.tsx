import { Descriptions, Tabs, Tag } from 'antd';
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
    <Tabs
        tabPosition="left"
        items={policies?.map((policy : {role : string, can : Array<string>, on : Array<string>}, index) => {
          return {
            label: `${policy.role}`,
            key: `${index}`,
            disabled: false,
            children: 
              <Descriptions
                key={index}
                column={1}
                size="middle"
                layout="horizontal"
              >
                <Descriptions.Item label="role">
                  <Tag color="green">{policy.role}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="can">
                  {policy?.can?.map((action : string) => {
                    return <Tag color="green">{action}</Tag>
                  })}
                </Descriptions.Item>
                <Descriptions.Item label="on">
                  {policy?.on?.map((resource : string) => {
                    return <Tag color="green">{resource}</Tag>
                  })}
                </Descriptions.Item>
              </Descriptions>
          };
        })} />
    </>
  )
}
