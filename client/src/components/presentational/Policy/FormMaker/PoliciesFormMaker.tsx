import React from 'react'
import { Divider, MenuProps, Select, Space, Switch, Typography } from "antd";

import { IFormMakerPolicyProps, IPolicyPolciesStepProps } from "types/forms";
import { MinusCircleFilled, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ChangeEvent } from "react";
import MockifyButton from "components/commons/Button/Button";
import MockifyInput from 'components/commons/Input/Input';
import MockifySelect from 'components/commons/Select/Select';
import { normlizeSelectOptionsList } from 'utils';

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
                htmlType='button'
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
                    htmlType='button'
                    onClick={() => handleAddPolicies("", policyIndex, "resource")}
                  /> 
                </Space>
                {pp?.on?.map((reso : any, resourceIndex : number) => {
                  return (
                    <Space direction="horizontal">
                      <MockifySelect
                        options={normlizeSelectOptionsList(policy?.actions)}
                        onChange={(e) => handleFormChangePolicies(e, resourceIndex, policyIndex, "resource")}
                        label="resources"
                      />
                      <MockifyButton
                        classes={['table-action-secondary', 'table-action']}
                        icon={<MinusCircleOutlined />}
                        htmlType='button'
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
                    htmlType='button'
                    onClick={() => handleAddPolicies("", policyIndex, "action")}
                  /> 
                </Space>
                {pp?.can?.map((action : any, actionIndex : number) => {
                  return (
                    <Space direction="horizontal">
                      <MockifySelect
                        options={normlizeSelectOptionsList(policy?.actions)}
                        onChange={(e) => handleFormChangePolicies(e, actionIndex, policyIndex, "action")}
                        label="actions"
                        />
                      <MockifyButton
                        classes={['table-action-secondary', 'table-action']}
                        icon={<MinusCircleOutlined />}
                        htmlType='button'
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
