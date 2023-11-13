import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IPolicyForm } from 'types/forms';


const PolicyForm : React.FC<IPolicyForm> = (
  { 
    handleFormSubmit, 
    handleFormChange, 
    data, 
    form, 
    onFinish, 
    projectOptions,
  }
  ) => {
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
      <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
      />
      </Form>  
    )
}

export default PolicyForm;