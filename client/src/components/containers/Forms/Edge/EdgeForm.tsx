import { Form, Select, Typography } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IEdgeForm } from 'types/forms';


const EdgeForm : React.FC<IEdgeForm> = (
  { handleFormSubmit, handleFormChange, data, form, onFinish, resourceOptions, methodOptions }
  ) => {
    console.log(data)
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
        <div className="mockify-input">
          <Select
            value={data.resource as string}
            onChange={(e : any) => handleFormChange(e, 'resource', 0)}
          >
          {resourceOptions?.map((res : any, index : number) => {
            return (
              <Select.Option key={index} value={res._id}>{res.resourceName}</Select.Option>
            )
          })}
          </Select>
          <label className="input-label">resource</label>
        </div>
        <MockifyInput 
          placeholder='name' 
          type='text'
          classes={['input']}
          name="name"
          label="name"
          value={data.name as string}
          onChange={(e : any) => handleFormChange(e, 'name', 0)}
        />
        <div className="mockify-input">
        <Select
        value={data.method as string}
          onChange={(e : any) => handleFormChange(e, 'method', 0)}
        >
        {["GET", "POST", "DELETE", "PUT"].map((res : any, index : number) => {
          return (
            <Select.Option key={index} value={res}>{res}</Select.Option>
          )
        })}
        </Select>
        <label className="input-label">method</label>
        </div>
        <Typography>Edge Function Code:</Typography>
        <MockifyCodeEditor
          value={data.code as string}
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