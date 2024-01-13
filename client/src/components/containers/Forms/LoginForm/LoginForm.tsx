import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import LoginFormController from 'services/LoginForm';
import React from 'react'



const LoginForm : React.FC = () => {
  const {data, handleFormChange, handleLoginFormSubmit} = LoginFormController()
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    autoComplete="off"
    onSubmitCapture={handleLoginFormSubmit}
    >
      <MockifyInput 
        placeholder='Enter your username' 
        type='text'
        classes={['input']}
        name="username"
        label="username"
        value={data?.username}
        onChange={handleFormChange}
      />
      <MockifyInput 
        placeholder='Enter your password' 
        type='password'
        classes={['input']}
        name="password"
        label="password"
        onChange={handleFormChange}
        value={data?.password}
      />
      <MockifyButton 
        classes={['mockify-btn']}
        text="Login"
        htmlType="submit"
        />
    </Form>  
  )
}

export default LoginForm;
