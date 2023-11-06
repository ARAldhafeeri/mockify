import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IResourceForm } from 'types/forms';

const typesMenu : MenuProps['items'] = [
  {
    key: "1",
    label: "string",
  },
  {
    key: "2",
    label: "number",
  },
  {
    key: "3",
    label: "boolean",
  }
]

const ResourceForm : React.FC<IResourceForm> = (
  { 
    handleFormSubmit, 
    handleFormChange, 
    data, 
    form, 
    onFinish, 
    handleAddFunction, 
    handleRemoveFunction, 
    handleAddField, 
    handleRemoveField,   
    handleFormChangeFuncs,
    handleFormChangeFeatures,
    handleFormChangeFields, 
  }
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
      {/* NAME */}
      <MockifyInput
        name={"resourceName"}
        label={"resource name"}
        value={data.resourceName}
        onChange={(e) => handleFormChange(e, "resourceName")}
        classes={['mockify-input', 'input']}
        />
      {/* FEATURES */}
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
                onChange={(checked : boolean) => handleFormChangeFeatures(checked, name)}
                />
            </Col>


          )
        })
      }
      </Row>
      <Divider />
      {/* Functions */}
      <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
        <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Functions</Typography>
        <MockifyButton
            classes={['mockify-icon-btn']}
            icon={<PlusCircleOutlined style={{fontSize: '33px'}}/>}
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
                <Space direction="horizontal" style={{width: "100%", justifyContent: "space-between"}}>
                  <Badge count={index + 1} key={index} />
                  <MockifyButton
                    classes={['mockify-icon-btn']}
                    icon={<MinusCircleOutlined />}
                    onClick={() => handleRemoveFunction(index)}
                  />
                </Space>
                <MockifyCodeEditor
                  key={index}
                  value={func}
                  width={"100%"}
                  height={"200px"}
                  onChange={(value : string) => handleFormChangeFuncs(value, index)}
                  />
                  <Divider />
              </>
            ),
          };
        })}
      />
      <Divider />
      {/* Schemas */}
      <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
        <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Schema</Typography>
        <MockifyButton
            classes={['mockify-icon-btn']}
            icon={<PlusCircleOutlined style={{fontSize: '33px'}}/>}
            onClick={() => handleAddField("", "", false)}
          />
      </Space>
      <Space wrap>
        {data.fields.map((field : any, index : number) => {
            return (
              <>
                <MockifyInput 
                  name={"fieldName"} 
                  label={"field name"} 
                  key={index} classes={['input-dynamic-field', 'mockify-input']} 
                  value={field.name}
                  onChange={(e) => handleFormChangeFields(index, "name", e.target.value)} 
                />
                <Space wrap>
                  <Select 
                    defaultValue={field.type} 
                    style={{ width: 120 }} 
                    onChange={(value : string) => handleFormChangeFields(index, "type", value)}>
                    {
                      typesMenu.map((type : any, index : number) => {
                        return (
                          <Select.Option key={index} value={type.label}>{type.label}</Select.Option>
                        )
                      })
                    }
                  </Select>
                  <Switch 
                   checkedChildren="required" 
                   unCheckedChildren="required" 
                   defaultChecked={field.required}
                   onChange={(checked : boolean) => handleFormChangeFields(index, "required", checked)}
                   />
                  <MockifyButton
                    classes={['mockify-icon-btn']}
                    icon={<MinusCircleOutlined />}
                    onClick={() => handleRemoveField(index)}
                  />  
                </Space>             
              </>
            )
        })
      }
    </Space>

      <MockifyButton 
          classes={['mockify-btn']}
          text="send"
          htmlType="submit"
      />
      </Form>  
    )
}

export default ResourceForm;