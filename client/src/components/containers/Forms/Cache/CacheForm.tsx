import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { ICacheForm } from 'types/forms';
import { Space } from 'antd';
import { Formactory } from 'formactory';



const CacheForm : React.FC<ICacheForm> = (
  { handleFormSubmit, handleFormChange,  data, form, onFinish }
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
      schema: [
        {
          type: "custom",
          component: MockifyInput,
          props: {
            name: "key",
            placeholder: "name",
            type: "text",
            label: "key",
            key: 'key',
            classes: ['input'],
            value: data?.key as string,
            onChange: (e: any) => handleFormChange(e),
          },
        },
        {
          label: "value",
          type: "custom",
          component: MockifyInput,
          props: {
            name: "value",
            placeholder: "name",
            type: "text",
            label: "value",
            key: 'value',
            classes: ['input'],
            value: data?.value as string,
            onChange: (e: any) => handleFormChange(e),
          },
        },
        {
          name: "send",
          type: "custom",
          component: MockifyButton,
          props: {
            text: "send",
            key: 'send',
            htmlType: "submit",
            classes: ['mockify-btn'],
          },
        }
      ]
    }
    return (
      <Formactory {...settings} />
    )
}

export default CacheForm;