import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IClientForm } from 'types/forms';
import { Space } from 'antd';
import ProjectsSelect from '../Project/ProjectSelect';


const ClientForm : React.FC<IClientForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish, projectOptions}
  ) => {
    return (
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        form={form}
        onFinish={onFinish}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onSubmitCapture={handleFormSubmit}
      >
        <Space direction='vertical' className='contentCenter'>
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="name"
          label="name"
          value={data?.name as string}
          onChange={handleFormChange}
        />
        <ProjectsSelect 
          projectOptions={projectOptions}
          handleFormChangeSelect={handleFormChangeSelect}
          />
        <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
          />
        </Space>
      </Form>  
    )
}

export default ClientForm;