import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import UsersSelect from 'components/containers/Forms/User/UsersSelect';
import UserController from 'controllers/User';
import React from 'react';
import { IProjectForm } from 'types/forms';
import { Space } from 'antd';


const ProjectForm : React.FC<IProjectForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish }
  ) => {
    const { user } = UserController();
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

        <UsersSelect
          userOptions={user}
          handleFormChange={handleFormChangeSelect}
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

export default ProjectForm;