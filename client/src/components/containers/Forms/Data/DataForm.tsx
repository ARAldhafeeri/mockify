import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import { FormMakerData } from 'components/presentational/Resource/FormMaker/FormMaker';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IDataForm } from 'types/forms';
import ResourcesSelect from '../Resource/ResourcesSelect';
import ResourceController from 'controllers/Resource';

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
    handleFormChangeSelect,
    data, 
    fieldsSchema,
    form, 
    onFinish,
  }) => {
    const { resource } = ResourceController();
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
        <ResourcesSelect
          resourceOptions={resource}
          handleFormChange={handleFormChangeSelect}
          />
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