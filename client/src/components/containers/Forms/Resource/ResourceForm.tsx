import { Form, Steps, Button } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react';
import { IResourceForm } from 'types/forms';
import GeneralInfoStep from './FormSteps/GeneralInfoStep';
import FeatureStep from './FormSteps/FeatureStep';
import SchemaStep from './FormSteps/SchemaStep';


const ResourceForm : React.FC<IResourceForm> = (
  { 
    handleFormSubmit, 
    handleFormChange, 
    data, 
    form, 
    onFinish, 
    handleAddField, 
    handleRemoveField,   
    handleFormChangeFeatures,
    handleFormChangeFields,
    projectOptions,
    // steps
    currentStep,
    nextStep,
    prevStep
  }
  ) => {

    const steps = [
      {
        title: 'General',
        content: 
        <GeneralInfoStep 
          handleFormChange={handleFormChange} 
          data={data} 
          projectOptions={projectOptions} />
      },
      {
        title: 'Features',
        content: 
        <FeatureStep
          handleFormChangeFeatures={handleFormChangeFeatures}
          data={data} />
      },
      {
        title: 'Schema',
        content: 
        <SchemaStep
          handleAddField={handleAddField}
          data={data}
          handleFormChangeFields={handleFormChangeFields}
          handleRemoveField={handleRemoveField} />
      },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
      wrapperCol={{ span: 16 }}
      size="small"
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
      {currentStep === steps.length - 1 && (
      <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
      />
      )}
      </Form>  
    )
}

export default ResourceForm;