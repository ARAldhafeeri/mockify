import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import UsersSelect from 'components/containers/Forms/User/UsersSelect';
import UserService from 'services/User';
import React from 'react';
import { IProjectForm } from 'types/forms';
import { Space } from 'antd';
import { Formactory } from 'formactory';

const ProjectForm : React.FC<IProjectForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish }
  ) => {
    const { user } = UserService();
    const settings = {
      form : {
        props: {
          name: "basic",
          labelCol: { span: 2 },
          form: form,
          onFinish: onFinish,
          wrapperCol: { span: 16 },
          style: { maxWidth: 400 },
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
            name: "name",
            placeholder: "name",
            type: "text",
            label: "name",
            key: 'name',
            classes: ['input'],
            value: data?.name as string,
            onChange: handleFormChange
          },
        },
        {
          type: "custom",
          component: UsersSelect,
          props: {
            userOptions: user,
            handleFormChange: handleFormChangeSelect,
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
      ]
    }
    return (
      <Formactory {...settings} />
    )
}

export default ProjectForm;