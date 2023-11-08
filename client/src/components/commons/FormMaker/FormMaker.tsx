import { MenuProps, Select, Space, Switch } from "antd";
import MockifyInput from "../Input/Input";
import { IFormMakerDataProps, IFormMakerResoruceProps } from "./FormMaker.types";
import MockifyButton from "../Button/Button";
import { MinusCircleFilled } from "@ant-design/icons";
import { ChangeEvent } from "react";

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

export const FormMakerResource = (props: IFormMakerResoruceProps) => {
  const { 
    handleFormChangeFields,
    handleRemoveField,
    handleAddField,
    data,
    fieldsSchema
  
  } = props;
    return (
      <Space wrap>
       {fieldsSchema?.map((field : any, index : number) => {
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
              icon={<MinusCircleFilled />}
              onClick={() => handleRemoveField(index)}
            />  
          </Space> 
        </>        
        )})}   
      </Space>
    )
}


export const FormMakerData = (props: IFormMakerDataProps) => {
  const { 
    handleChange,
    data,
    fieldsSchema
  } = props;

  return (
    <Space direction="vertical">
     {fieldsSchema?.map((field : any, index : number) => {
      return (
        <>
        <MockifyInput 
          name={field.name} 
          label={"field name"} 
          key={index} classes={['input-dynamic-field', 'mockify-input']} 
          value={data?.data?.[field.name]}
          onChange={(e) => handleChange(e)} 
        />
      </>        
      )})}   
    </Space>
  )
}