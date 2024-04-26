import { PlusCircleOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import MockifyButton from 'components/commons/Button/Button'
import { FormMakerPolicy } from 'components/presentational/Policy/FormMaker/FormMaker';
import React from 'react'
import { IPolicyFieldsStepProps } from 'types/forms';

export default function FieldsStep(props : IPolicyFieldsStepProps ) {
  const {data, handleAdd, handleRemove, handleFormChange, fieldsType} = props;
  return (
        <form>
            <MockifyButton
                classes={['table-action-primary', 'table-action']}
                icon={<PlusCircleOutlined />}
                htmlType='button'
                onClick={() => handleAdd("", fieldsType)}
              />
          <FormMakerPolicy 
            fields={data}
            handleAdd={handleAdd}
            handleFormChange={handleFormChange}
            handleRemove={handleRemove}
            fieldsType={fieldsType}
          />
      </form>
  )
}
