import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, } from 'antd';
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
                defaultChecked={data.features[name as keyof typeof data.features]}
                onChange={(checked : boolean) => handleFormChange(checked, name)}
                />
            </Col>


          )
        })
      }
      </Row>
      <Divider />
      <Space direction='horizontal'>
        <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Functions</Typography>
        <MockifyButton
            classes={['editor-func-btn']}
            icon={<PlusCircleFilled />}
            onClick={() => handleAddFunction("")}
          />
      </Space>

      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{ height: "100%" }}
        items={data.funcs.map((func : any, index : number) => {
          return {
            label: `Function-${index}`,
            key: `${index}`,
            disabled: false,
            children: (
              <>
                <Space direction="horizontal" style={{width: "100%"}}>
                  <Badge count={index + 1} key={index} />
                  <MockifyButton
                    classes={['editor-func-btn']}
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
            ),
          };
        })}
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