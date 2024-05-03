import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import MockifyInput from 'components/commons/Input/Input';
import MockifySelect from 'components/commons/Select/Select';
import React from 'react';
import { IEdgeForm } from 'types/forms';
import { normlizeOptions } from '../Resource/ResourcesSelect';
import { Formactory } from 'formactory';

const EdgeForm : React.FC<IEdgeForm> = (
  { handleFormSubmit, handleFormChange, data, form, onFinish, resourceOptions, methodOptions }
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
            name: "name",
            placeholder: "name",
            type: "text",
            label: "name",
            key: 'name',
            classes: ['input'],
            value: data?.name as string,
            onChange: (e: any) => handleFormChange(e, 'name', 0),
          },
        },
        {
          type: "custom",
          component: MockifySelect,
          props: {
            options: normlizeOptions(resourceOptions),
            onChange: (e: any) => handleFormChange(e, 'resource', 0),
            label: 'resources',
          },
        },
        {
          type: "custom",
          component: MockifySelect,
          props: {
            options: [
              {value: 'GET', label: 'GET'},
              {value: 'POST', label: 'POST'},
              {value: 'DELETE', label: 'DELETE'},
              {value: 'PUT', label: 'PUT'}
            
            ],
            onChange: (e: any) => handleFormChange(e, 'method', 0),
            label: 'method',
          },
        },
        {
          type: "custom",
          component: MockifyCodeEditor,
          props: {
            value: data?.code as string,
            height: '600px',
            width: '400px',
            onChange: (e: any) => handleFormChange(e, 'code', 0),
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
    };
    return (
      <Formactory {...settings} />
    )
}

export default EdgeForm;