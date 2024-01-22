import React from 'react'
import { Space, Typography } from 'antd'
import MockifyButton from 'components/commons/Button/Button'
import { FormMakerResource } from 'components/presentational/Resource/FormMaker/FormMaker'
import { PlusCircleOutlined } from '@ant-design/icons'
import { IResourceFormFieldsStepProps } from 'types/forms'

export default function SchemaStep(props : IResourceFormFieldsStepProps) {
  const {handleAddField, data, handleFormChangeFields, handleRemoveField} = props;
  
  const fields = data?.fields ?? [];
  return (
    <>
      {/* Schemas */}
      <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
          <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Schema</Typography>
          <MockifyButton
              classes={['table-action-primary', 'table-action']}
              icon={<PlusCircleOutlined />}
              onClick={() => handleAddField("", "", false)}
            />
        </Space>
        <FormMakerResource 
          data={fields}
          fieldsSchema={fields}
          handleAddField={handleAddField}
          handleFormChangeFields={handleFormChangeFields}
          handleRemoveField={handleRemoveField}
        />
    </>
  )
}
