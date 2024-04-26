import { Form, Typography } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import MockifyInput from 'components/commons/Input/Input';
import MockifySelect from 'components/commons/Select/Select';
import React from 'react';
import { IEdgeForm } from 'types/forms';
import { normlizeOptions } from '../Resource/ResourcesSelect';

const EdgeForm : React.FC<IEdgeForm> = (
  { handleFormSubmit, handleFormChange, data, form, onFinish, resourceOptions, methodOptions }
  ) => {
    return (
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={handleFormSubmit}
      >
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="name"
          label="name"
          value={data?.name as string}
          onChange={(e : any) => handleFormChange(e, 'name', 0)}
        />
        <MockifySelect
          options={normlizeOptions(resourceOptions)}
          onChange={(e : any) => handleFormChange(e, 'resource', 0)}
          label='resources'
        />
        <MockifySelect 
          options={[
            {value: 'GET', label: 'GET'},
            {value: 'POST', label: 'POST'},
            {value: 'DELETE', label: 'DELETE'},
            {value: 'PUT', label: 'PUT'}
          
          ]}
          onChange={(e : any) => handleFormChange(e, 'method', 0)}
          label='method'
          />
        <Typography>Edge Function Code:</Typography>
        <MockifyCodeEditor
          value={data?.code as string}
          height='600px'
          width="400px"
          onChange={(e : any) => handleFormChange(e, 'code', 0)}
          />
        <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
          />
      </Form>  
    )
}

export default EdgeForm;