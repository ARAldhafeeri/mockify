import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Row, Col, Typography, Divider, Space, Badge, Tabs, Input, Select, MenuProps, Dropdown, } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import { FormMakerResource } from 'components/commons/FormMaker/FormMaker';
import MockifyInput from 'components/commons/Input/Input';
import React from 'react';
import { IResourceForm } from 'types/forms';


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
    projectOptions,
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
      {/* project */}
      <Select 
        className='mockify-select'
        defaultValue={data.project}
        onChange={(value : string) => handleFormChange(value, "project")}
        >
          {projectOptions.map((project : any, index : number) => {
            return (
              <Select.Option key={index} value={project._id}>{project.name}</Select.Option>
            )
          })}
        </Select>
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
      <FormMakerResource 
        data={data.fields}
        fieldsSchema={data.fields}
        handleAddField={handleAddField}
        handleFormChangeFields={handleFormChangeFields}
        handleRemoveField={handleRemoveField}
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