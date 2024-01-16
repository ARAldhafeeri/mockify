import { Form } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { ICacheForm } from 'types/forms';
import { Space } from 'antd';


const CacheForm : React.FC<ICacheForm> = (
  { handleFormSubmit, handleFormChange,  data, form, onFinish }
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
          name="key"
          label="key"
          value={data?.key as string}
          onChange={(e) => handleFormChange(e) }
        />
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="value"
          label="value"
          value={data?.value as string}
          onChange={(e) => handleFormChange(e) }
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

export default CacheForm;