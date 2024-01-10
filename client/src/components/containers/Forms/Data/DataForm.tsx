import { Form, MenuProps} from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import { FormMakerData } from 'components/presentational/Data/FormMaker/FormMaker';
import React from 'react';
import { IDataForm } from 'types/forms';

const typesMenu : MenuProps['items'] = [
  {
    key: "1",
    label: "string",
  },
  {
    key: "2",
    label: "number",
  },
  {
    key: "3",
    label: "boolean",
  }
]

const DataForm : React.FC<IDataForm> = (
  { 
    handleFormSubmit, 
    handleFormChange, 
    hanldeFormChangeFields,
    data, 
    fieldsSchema,
    form, 
    onFinish,
  }) => {

    return (
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handleFormSubmit}
      >
        <FormMakerData
          data={data}
          fieldsSchema={fieldsSchema}
          handleChange={handleFormChange} 
          hanldeFormChangeFields={hanldeFormChangeFields}
          />

        <MockifyButton 
            classes={['mockify-btn']}
            text="send"
            htmlType="submit"
        />
        </Form>  
    )
}

export default DataForm;