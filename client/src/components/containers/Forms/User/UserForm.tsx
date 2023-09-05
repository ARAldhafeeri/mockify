import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IUserForm } from 'types/forms';


const UserForm : React.FC<IUserForm> = ({ handleFormSubmit, handleFormChange, data }) => {
    return (
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handleFormSubmit}
      >
        <MockifyInput 
          placeholder='username' 
          type='text'
          classes={['input']}
          name="username"
          label="username"
          value={data.username as string}
          onChange={handleFormChange}
        />
        <MockifyInput 
          placeholder='password' 
          type='text'
          classes={['input']}
          name="password"
          label="password"
          onChange={handleFormChange}
          value={data.password as string}
        />
        <MockifyInput 
          placeholder='role' 
          type='text'
          classes={['input']}
          name="role"
          label="role"
          onChange={handleFormChange}
          value={data.role as string}
        />

        <MockifyInput 
          placeholder='email' 
          type='text'
          classes={['input']}
          name="email"
          label="email"
          onChange={handleFormChange}
          value={data.email as string}
        />
        <MockifyButton 
          classes={['mockify-btn']}
          text="update user"
          htmlType="submit"
          />
      </Form>  
    )
}

export default UserForm;