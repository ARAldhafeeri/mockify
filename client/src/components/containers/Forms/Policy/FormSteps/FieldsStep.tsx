import { PlusCircleOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import MockifyButton from 'components/commons/Button/Button'
import { FormMakerPolicy } from 'components/presentational/Policy/FormMaker/FormMaker';
import React from 'react'
import { IPolicyFieldsStepProps } from 'types/forms';

export default function FieldsStep(props : IPolicyFieldsStepProps ) {
  const {data, handleAdd, handleRemove, handleFormChange, fieldsType} = props;
  return (
    <>
        <Space direction='horizontal' style={{width: "100%", justifyContent: "end"}}>
            <MockifyButton
                classes={['table-action-primary', 'table-action']}
                icon={<PlusCircleOutlined />}
                onClick={() => handleAdd("", fieldsType)}
              />
          </Space>
          <FormMakerPolicy 
            fields={data}
            handleAdd={handleAdd}
            handleFormChange={handleFormChange}
            handleRemove={handleRemove}
            fieldsType={fieldsType}
          />
      </>
  )
}
