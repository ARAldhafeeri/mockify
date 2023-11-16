import React from 'react'
import { Space, Typography } from 'antd'
import MockifyButton from 'components/commons/Button/Button'
import { FormMakerResource } from 'components/containers/Resource/FormMaker/FormMaker'
import { PlusCircleOutlined } from '@ant-design/icons'
import { IResourceFormFieldsStepProps } from 'types/forms'

export default function SchemaStep(props : IResourceFormFieldsStepProps) {
  const {handleAddField, data, handleFormChangeFields, handleRemoveField} = props;
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
          data={data.fields}
          fieldsSchema={data.fields}
          handleAddField={handleAddField}
          handleFormChangeFields={handleFormChangeFields}
          handleRemoveField={handleRemoveField}
        />
    </>
  )
}
