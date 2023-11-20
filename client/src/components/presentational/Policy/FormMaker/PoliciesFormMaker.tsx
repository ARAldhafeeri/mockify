import React from 'react'
import { Divider, MenuProps, Select, Space, Switch, Typography } from "antd";

import { IFormMakerPolicyProps, IPolicyPolciesStepProps } from "types/forms";
import { MinusCircleFilled, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ChangeEvent } from "react";
import MockifyButton from "components/commons/Button/Button";
import MockifyInput from 'components/commons/Input/Input';

export const PoliciesFormMaker = (props: IPolicyPolciesStepProps) => {
  const { 
    handleFormChangePolicies,
    handleRemovePolicies,
    handleAddPolicies,
    data,
    policy,
  } = props;

  return (
      <>
        {policy?.policies?.map((pp : any, policyIndex : number) => {
          return (
            <>
              <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
              {/* policy role */}
              <MockifyInput
                name="role"
                label="Role"
                key={policyIndex}
                classes={["input-dynamic-field", "mockify-input"]}
                value={pp?.role}
                onChange={(e) => handleFormChangePolicies(e.target.value, 0, policyIndex, "role")}
                />
              <MockifyButton
                classes={['mokify-button']}
                text="Delete Policy"
                onClick={() => handleRemovePolicies(policyIndex, policyIndex, "policy")}
                />
              </Space>
              <Space direction="vertical" style={{width: "100%", justifyContent: "end"}}>
               {/* on */}
               <Space direction="vertical">
                <Space direction="horizontal" style={{ justifyContent: "space-evenly" }}>
                  <Typography className="policiesHeader">Resources</Typography>
                  <MockifyButton
                    classes={['table-action-third', 'table-action']}
                    icon={<PlusOutlined  size={32} />}
                    onClick={() => handleAddPolicies("", policyIndex, "resource")}
                  /> 
                </Space>
                {pp?.on?.map((reso : any, resourceIndex : number) => {
                  return (
                    <Space direction="horizontal">
                      <Select
                          style={{ width: 200, margin: "0 1px" }}
                          defaultValue={reso}
                          onChange={(e) => handleFormChangePolicies(e, resourceIndex, policyIndex, "resource")}
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
                        icon={<MinusCircleOutlined />}
                        onClick={() => handleRemovePolicies(resourceIndex, policyIndex, "resource")}
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
                    onClick={() => handleAddPolicies("", policyIndex, "action")}
                  /> 
                </Space>
                {pp?.can?.map((action : any, actionIndex : number) => {
                  return (
                    <Space direction="horizontal">
                      <Select
                        style={{ width: 200 }}
                        defaultValue={action}
                        optionFilterProp="children"
                        onChange={(e) => handleFormChangePolicies(e, actionIndex, policyIndex, "action")}
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
                        icon={<MinusCircleOutlined />}
                        onClick={() => handleRemovePolicies(actionIndex, policyIndex, "action")}
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
