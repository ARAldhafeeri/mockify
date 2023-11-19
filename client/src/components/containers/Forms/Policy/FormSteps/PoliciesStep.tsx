import { Space } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react'
import { IPolicyPolciesStepProps } from 'types/forms'
import { PlusOutlined } from '@ant-design/icons'
import { PoliciesFormMaker } from 'components/presentational/Policy/FormMaker/PoliciesFormMaker';


export default function PoliciesStep( props : IPolicyPolciesStepProps) {
  const {data, handleAdd, handleRemove, policy,  handleFormChange, fieldsType} = props;
  return (
    <>
        <Space direction='horizontal' style={{width: "100%", justifyContent: "end"}}>
            <MockifyButton
                classes={['table-action-primary', 'table-action']}
                icon={<PlusOutlined />}
                onClick={() => handleAdd("", fieldsType)}
              />
          </Space>
          <PoliciesFormMaker 
            fields={data}
            policy={policy}
            handleAdd={handleAdd}
            handleFormChange={handleFormChange}
            handleRemove={handleRemove}
            fieldsType={fieldsType}
          />
      </>
  )
}
