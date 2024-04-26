import { MenuProps, Select, Space, Switch } from "antd";
import MockifyInput from "components/commons/Input/Input";
import {IFormMakerResoruceProps } from "./FormMaker.types";
import { MinusCircleFilled } from "@ant-design/icons";
import MockifyButton from "components/commons/Button/Button";
import MockifySelect from "components/commons/Select/Select";

interface ITypesMenu {
  value: string;
  label: string;
}
const typesMenu : ITypesMenu[] = [
  {
    value: "1",
    label: "string",
  },
  {
    value: "2",
    label: "number",
  },
  {
    value: "3",
    label: "boolean",
  },
  {
    value: "4",
    label: "object",
  },
  {
    value: "5",
    label: "array",
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
        <div className="flex flex-row">
          <MockifyInput 
            name={"fieldName"} 
            label={"field name"} 
            key={index} classes={['input-dynamic-field', 'mockify-input']} 
            value={field.name}
            onChange={(e) => handleFormChangeFields(index, "name", e.target.value)} 
          />

            <MockifySelect
              label='types'
              options={typesMenu}
              onChange={(value : string) => handleFormChangeFields(index, "type", value)}
            />
            <Switch 
            checkedChildren="required" 
            unCheckedChildren="required" 
            defaultChecked={field.required}
            className="mt-5"
            onChange={(checked : boolean) => handleFormChangeFields(index, "required", checked)}
            />
            <MockifyButton
              classes={['h-[30px]', 'w-[30px]', 'mt-5']}
              icon={<MinusCircleFilled />}
              onClick={() => handleRemoveField(index)}
            />  
          </div> 
        </>        
        )})}   
      </Space>
    )
}