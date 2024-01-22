import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IEventForm } from 'types/forms';
import { Space } from 'antd';
import ResourcesSelect from '../Resource/ResourcesSelect';
import EdgesSelect from '../Edge/EdgeSelect';


const EventForm : React.FC<IEventForm> = (
  { handleFormSubmit, handleFormChange, handleFormChangeSelect,  data, form, onFinish, resource, edge}
  ) => {
    return (
      <Form
      name="basic"
      labelCol={{ span: 2 }}
      form={form}
      onFinish={onFinish}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 400 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handleFormSubmit}
      >
        <Space direction='vertical' className='contentCenter'>
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="name"
          label="name"
          value={data?.name as string}
          onChange={handleFormChange}
        />

        {/* resource select */}
        <ResourcesSelect
          resourceOptions={resource}
          handleFormChange={(value) => handleFormChangeSelect(value, 'resource')}
        />
        {/* edge select */}
        <EdgesSelect
          edgeOptions={edge}
          handleFormChange={(value) => handleFormChangeSelect(value, 'handler')}
        />
        <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
          />
        </Space>
      </Form>  
    )
}

export default EventForm;