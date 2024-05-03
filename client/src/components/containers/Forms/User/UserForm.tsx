import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IUserForm } from 'types/forms';
import UserRoleSelect from 'components/presentational/User/UserRoleSelect';
import { Formactory } from 'formactory';

const UserForm : React.FC<IUserForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect, data, form, onFinish }
  ) => {
    const settings = {
      form : {
        props: {
          name: "basic",
          labelCol: { span: 8 },
          form: form,
          onFinish: onFinish,
          wrapperCol: { span: 16 },
          style: { maxWidth: 600 },
          initialValues: { remember: true },
          autoComplete: "off",
          onSubmitCapture: handleFormSubmit,
        },
        customComponent: Form,
      },
      schema: [
        {
          type: "custom",
          component: MockifyInput,
          props: {
            name: "username",
            placeholder: "username",
            type: "text",
            label: "username",
            key: 'username',
            classes: ['input'],
            value: data?.username as string,
            onChange: handleFormChange
          },
        },
        {
          type: "custom",
          component: MockifyInput,
          props: {
            name: "password",
            placeholder: "password",
            type: "text",
            label: "password",
            key: 'password',
            classes: ['input'],
            value: data?.password as string,
            onChange: handleFormChange
          },
        },
        {
          type: "custom",
          component: UserRoleSelect,
          props: {
            role: data?.role as string,
            handleFormChangeSelect: handleFormChangeSelect
          },
        },
        {
          type: "custom",
          component: MockifyInput,
          props: {
            name: "email",
            placeholder: "email",
            type: "text",
            label: "email",
            key: 'email',
            classes: ['input'],
            value: data?.email as string,
            onChange: handleFormChange
          },
        },
        {
          type: "custom",
          component: MockifyButton,
          props: {
            classes: ['mockify-btn'],
            text: "send",
            htmlType: "submit",
          },
        },
      ],
    };
    return <Formactory {...settings} />;
}

export default UserForm;