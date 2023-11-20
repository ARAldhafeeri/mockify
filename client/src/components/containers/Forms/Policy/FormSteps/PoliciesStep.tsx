import { Space } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react'
import { IPolicyPolciesStepProps } from 'types/forms'
import { PlusOutlined } from '@ant-design/icons'
import { PoliciesFormMaker } from 'components/presentational/Policy/FormMaker/PoliciesFormMaker';


export default function PoliciesStep( props : IPolicyPolciesStepProps) {
  const {data, handleAddPolicies, handleRemovePolicies, policy,  handleFormChangePolicies, fieldsType} = props;
  return (
    <>
        <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
            <MockifyButton
                classes={['policy-add-button']}
                text="Add policy"
                onClick={() => handleAddPolicies({on : [], can  : [], role: ""}, 0, "policy")}
              />
          </Space>
          <PoliciesFormMaker 
            policy={policy}
            data={data}
            handleFormChangePolicies={handleFormChangePolicies}
            handleRemovePolicies={handleRemovePolicies}
            handleAddPolicies={handleAddPolicies}
            fieldsType={fieldsType}
          />
      </>
  )
}
