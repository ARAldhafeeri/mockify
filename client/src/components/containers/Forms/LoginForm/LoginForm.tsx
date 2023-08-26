import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react'

const LoginForm : React.FC = () => {
  return (
    <>
      <MockifyInput 
        placeholder='Enter your username' 
        type='text'
        classes={['input']}
        name="username-login"
        label="username"
        value=""
        />
      <MockifyInput 
        placeholder='Enter your password' 
        type='password'
        classes={['input']}
        name="username-login"
        label="password"
        value=""
        />
      <MockifyButton 
        classes={['mockify-btn']}
        text="Login"
        />

    </>    
  )
}

export default LoginForm;
