import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import React from 'react';
import { IResourceForm } from 'types/forms';



const ResourceForm : React.FC<IResourceForm> = (
  { handleFormSubmit, handleFormChange, data, form, onFinish, handleAddFunction, handleRemoveFunction }
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
      <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Enable/Disable Features</Typography>

      <Row gutter={16}>
      {
        Object.keys(data.features).map((name : String, index : number) =>{
          return (
            <Col span={8} key={index}>
              <Switch 
                checkedChildren={name} 
                unCheckedChildren={name} 
                defaultChecked 
                onChange={(checked : boolean) => handleFormChange(checked, name)}
                />
            </Col>


          )
        })
      }
      </Row>
      <Divider />
      <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Functions</Typography>
      <Space direction="vertical" style={{width: "100%"}}>
        {
          data.funcs.map((func : any, index : number) => {
            return (
             <>
              <Space direction="horizontal" style={{width: "100%"}}>
                <Badge count={index + 1} key={index} />
                <MockifyButton
                  classes={['']}
                  icon={<MinusCircleFilled />}
                  onClick={() => handleRemoveFunction(index)}
                />
              </Space>
              <MockifyCodeEditor
                key={index}
                value={func}
                width={"100%"}
                height={"200px"}
                onChange={(value : string) => handleFormChange(value, index)}
                />
                <Divider />

             </>
            )
          })
        }
      </Space>
      <Divider />
      <MockifyButton
          classes={['mockify-btn']}
          icon={<PlusCircleFilled />}
          onClick={() => handleAddFunction("")}
        />
      <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
      />
      </Form>  
    )
}

export default ResourceForm;