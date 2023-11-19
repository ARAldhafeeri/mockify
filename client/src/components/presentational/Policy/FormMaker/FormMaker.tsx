import { Space } from "antd";
import MockifyInput from "components/commons/Input/Input";
import { IFormMakerPolicyData, IFormMakerPolicyProps } from "types/forms";
import { MinusCircleFilled } from "@ant-design/icons";
import MockifyButton from "components/commons/Button/Button";
import { PoliciesFormMaker } from "./PoliciesFormMaker";

export const FormMakerPolicy = (props: IFormMakerPolicyProps) => {
  const { 
    handleFormChange,
    handleRemove,
    handleAdd,
    data,
    policy,
    fields,
    fieldsType
  
  } = props;
    return (
      <Space wrap>
       {fields?.map((field : any, index : number) => {
        return (
          <>
            <MockifyInput 
              name={fieldsType ?? ""} 
              label={fieldsType ?? ""} 
              key={index} classes={['input-dynamic-field', 'mockify-input']} 
              value={field}
              onChange={(e) => handleFormChange(e.target.value, fieldsType, index)} 
              />
            <MockifyButton
              classes={['table-action-secondary', 'table-action']}
              icon={<MinusCircleFilled />}
              onClick={() => handleRemove(index, fieldsType ?? "")}
            />  
          </>        
        )})} 
      </Space>  
    )
}


export const FormMakerData = (props: IFormMakerPolicyData) => {
  const { 
    handleChange,
    data,
    fields,
  } = props;
  return (
    <Space direction="vertical">
     {fields?.map((field : any, index : number) => {
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