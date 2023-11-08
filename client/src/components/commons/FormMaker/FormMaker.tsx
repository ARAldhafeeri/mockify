import { MenuProps, Select, Space, Switch } from "antd";
import MockifyInput from "../Input/Input";
import { IFormMakerProps } from "./FormMaker.types";
import MockifyButton from "../Button/Button";
import { MinusCircleFilled } from "@ant-design/icons";

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

export const FormMaker = (props: IFormMakerProps) => {
  const { 
    handleFormChangeFields,
    handleAddField,
    handleRemoveField,
    index,
    field,
  
  } = props;
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
  )

}