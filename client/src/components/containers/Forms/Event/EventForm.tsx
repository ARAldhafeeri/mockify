import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IEventForm } from 'types/forms';
import { Space } from 'antd';
import ResourcesSelect from '../Resource/ResourcesSelect';
import EdgesSelect from '../Edge/EdgeSelect';
import { Formactory } from 'formactory';

const EventForm : React.FC<IEventForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish, resource, edge}
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
          component: ResourcesSelect,
          props: {
            resourceOptions: resource,
            handleFormChange: (value: any) => handleFormChangeSelect(value, 'resource'),
          },
        },
        {
          type: "custom",
          component: EdgesSelect,
          props: {
            edgeOptions: edge,
            handleFormChange: (value: any) => handleFormChangeSelect(value, 'handler'),
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
        }
      ],
    };
    return (
      <Formactory {...settings} />
    )
}

export default EventForm;