import React from 'react'
import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import LoginFormService from 'services/LoginForm';
import { Formactory } from 'formactory';


const LoginForm : React.FC = () => {
  const {data, handleFormChange, handleLoginFormSubmit} = LoginFormService()
  const settings = {
    form : {
      props: {
        name: "basic",
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        style: { maxWidth: 600 },
        initialValues: { remember: true },
        autoComplete: "off",
        onSubmitCapture: handleLoginFormSubmit,
      },
      customComponent: Form,
    },
    schema: [
      {
        type: "custom",
        component: MockifyInput,
        props: {
          placeholder: 'Enter your username',
          type: 'text',
          classes: ['input'],
          name: "username",
          label: "username",
          value: data?.username,
          onChange: handleFormChange,
        },
      },
      {
        type: "custom",
        component: MockifyInput,
        props: {
          placeholder: 'Enter your password',
          type: 'password',
          classes: ['input'],
          name: "password",
          label: "password",
          onChange: handleFormChange,
          value: data?.password,
        },
      },
      {
        type: "custom",
        component: MockifyButton,
        props: {
          classes: ['mockify-btn'],
          text: "Login",
          htmlType: "submit",
        },
      },
    ]
  };

  return (
    <Formactory {...settings} />
  )
}

export default LoginForm;
