import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IClientForm } from 'types/forms';
import { Space } from 'antd';
import ProjectsSelect from '../Project/ProjectSelect';
import { Formactory } from 'formactory';


const ClientForm : React.FC<IClientForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish, projectOptions}
  ) => {
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
      schema : [
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
            onChange: (e: any) => handleFormChange(e),
          },
        },
        {
          type: "custom",
          component: ProjectsSelect,
          props: {
            projectOptions: projectOptions,
            handleFormChangeSelect: handleFormChangeSelect,
          },
        },
        {
          type: "custom",
          component: MockifyButton,
          props: {
            text: "send",
            htmlType: "submit",
            classes: ['mockify-btn'],
          },
        },
      ],
    }
    return (
      <Formactory {...settings} />
    )
}

export default ClientForm;