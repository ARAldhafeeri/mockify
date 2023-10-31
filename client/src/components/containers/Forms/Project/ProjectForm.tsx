import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IProjectForm } from 'types/forms';


const ProjectForm : React.FC<IProjectForm> = (
  { handleFormSubmit, handleFormChange, data, form, onFinish }
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
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="name"
          label="name"
          value={data.name as string}
          onChange={handleFormChange}
        />
        <MockifyInput 
          placeholder='user' 
          type='user'
          classes={['input']}
          name="user"
          label="user"
          onChange={handleFormChange}
          value={data.user as string}
        />

        <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
          />
      </Form>  
    )
}

export default ProjectForm;