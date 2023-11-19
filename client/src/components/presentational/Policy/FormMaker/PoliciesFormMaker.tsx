import React from 'react'
import { Divider, MenuProps, Select, Space, Switch, Typography } from "antd";

import { IFormMakerPolicyProps } from "types/forms";
import { MinusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { ChangeEvent } from "react";
import MockifyButton from "components/commons/Button/Button";
import MockifyInput from 'components/commons/Input/Input';

export const PoliciesFormMaker = (props: IFormMakerPolicyProps) => {
  const { 
    handleFormChange,
    handleRemove,
    handleAdd,
    data,
    policy,
    fields,
    fieldsType
  
  } = props;

  return (
      <>
        {policy?.policies?.map((pp : any, index : number) => {
          return (
            <>
              {/* policy role */}
              <MockifyInput
                name="role"
                label="Role"
                key={index}
                classes={["input-dynamic-field", "mockify-input"]}
                value={pp?.role}
                onChange={(e) => handleFormChange(e.target.value, fieldsType, index)}
                />
              <Space direction="vertical" style={{width: "100%", justifyContent: "end"}}>
               {/* on */}
               <Space direction="vertical">
                <Space direction="horizontal" style={{ justifyContent: "space-evenly" }}>
                  <Typography className="policiesHeader">Resources</Typography>
                  <MockifyButton
                    classes={['table-action-third', 'table-action']}
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd("", fieldsType)}
                  /> 
                </Space>
                {pp?.on?.map((reso : any, index : number) => {
                  return (
                    <Space direction="horizontal">
                      <Select
                          style={{ width: 200, margin: "0 1px" }}
                          defaultValue={reso}
                          onChange={(e) => handleFormChange(e, fieldsType, index)}
                        >
                        {policy?.resources?.map((res : any) => {
                          return (
                            <Select.Option value={res}>
                              {res}
                            </Select.Option>
                          )
                        })}
                      </Select>
                      <MockifyButton
                        classes={['table-action-secondary', 'table-action']}
                        icon={<MinusCircleFilled />}
                        onClick={() => handleAdd("", fieldsType)}
                      /> 
                    </ Space>
                  )
                })}
              </Space>
              {/* can */}
              <Space direction="vertical">
                <Space direction="horizontal" style={{ justifyContent: "space-evenly" }}>
                  <Typography className="policiesHeader">Actions</Typography>
                  <MockifyButton
                    classes={['table-action-third', 'table-action']}
                    icon={<PlusOutlined />}
                    onClick={() => handleAdd("", fieldsType)}
                  /> 
                </Space>
                {pp?.can?.map((action : any, index : number) => {
                  return (
                    <Space direction="horizontal">
                      <Select
                        style={{ width: 200 }}
                        defaultValue={action}
                        optionFilterProp="children"
                        onChange={(e) => handleFormChange(e, fieldsType, index)}
                      >
                        {policy?.actions?.map((act : any) => {
                          return (
                            <Select.Option value={act}>
                              {act}
                            </Select.Option>
                          )
                        })}
                      </Select>
                      <MockifyButton
                        classes={['table-action-secondary', 'table-action']}
                        icon={<MinusCircleFilled />}
                        onClick={() => handleAdd("", fieldsType)}
                      /> 
                    </Space>

                  )
                })}
              </Space>
              </Space>
              <Divider />
            </>
          )
        })} 
      </>
  )
}
