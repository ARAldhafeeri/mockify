import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, Steps, Button, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react';
import { IPolicyForm } from 'types/forms';
import FieldsStep from './FormSteps/FieldsStep';
import PolicyPreview from 'components/presentational/Policy/PolicyPreview';


const PolicyForm : React.FC<IPolicyForm> = (
  { 
    handleFormSubmit, 
    handleFormChange, 
    data, 
    form, 
    onFinish, 
    projectOptions,
    currentStep,
    nextStep,
    prevStep,
    handleAdd,
    handleRemove
  }
  ) => {
    const steps = [
      {
        title: 'Resources',
        content: 
        <FieldsStep
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleFormChange={handleFormChange}
          data={data.resources}
          fieldsType='resource'
          />
      },
      {
        title: "Actions",
        content:
        <FieldsStep
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleFormChange={handleFormChange}
          data={data.actions}
          fieldsType='action'
          />
      },
      {
        title: "Roles",
        content:
        <FieldsStep
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleFormChange={handleFormChange}
          data={data.roles}
          fieldsType='role'
          />
      }, 
      {
        title: "Preview",
        content: <PolicyPreview data={data} />
      }
    ]
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
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
      <Steps current={currentStep} items={items} />
      {steps[currentStep].content}
      <div style={{ marginTop: 24 }}>
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => nextStep()}>
            Next
          </Button>
        )}

        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
            Previous
          </Button>
        )}
      </div>
      {currentStep === steps.length -1 && (
        <MockifyButton 
            classes={['mockify-btn']}
            text="send"
            htmlType="submit"
        />
      )}

      </Form>  
    )
}

export default PolicyForm;