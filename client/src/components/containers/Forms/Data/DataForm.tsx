import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import { FormMakerData } from 'components/commons/FormMaker/FormMaker';
import MockifyInput from 'components/commons/Input/Input';
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
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handleFormSubmit}
      >
        <FormMakerData
          data={data}
          fieldsSchema={fieldsSchema}
          handleChange={handleFormChange}          
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