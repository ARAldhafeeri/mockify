import { Space, Switch } from "antd";
import MockifyInput from "components/commons/Input/Input";
import { IFormMakerDataProps} from "./FormMaker.types";
import { ChangeEvent } from "react";
import MockifyCodeEditor from "components/commons/CodeEditor/CodeEditor";


const DynamicField: { [key: string]: React.FC<any> } = {
  string: MockifyInput,
  number: MockifyInput,
  boolean: Switch,
  object: MockifyCodeEditor,
  array: MockifyCodeEditor,
};

const DynamicFieldClasses : { [key: string]: Array<string> } = {
  string: ['input-dynamic-field', 'mockify-input'],
  number: ['input-dynamic-field', 'mockify-input'],
  boolean: ['input-dynamic', 'mockify-input'],
  object: ['input-dynamic-field-obj', 'mockify-input-obj'],
  array: ['input-dynamic-field-obj', 'mockify-input-obj'],
};

const FieldsFactory = (
  type : string, 
  name : string, 
  required : boolean,
  value : any, 
  index : number, 
  classes: Array<string>, 
  onChange : (e : ChangeEvent<HTMLInputElement>) => void,
  hanldeFormChangeFields: (name: string, value : any, type: string) => void, 
  extraProps : any = null
  ) => {
  
  const Component : React.FC<any> = DynamicField[type];
  return   (
    <div className="floating-label-container">
      <Component 
          label={name}
          name={name}
          value={value}
          onChange={ type === "boolean" || type === "array" || type === "object" ? (e : any) => hanldeFormChangeFields(name, e, type) : (e : any) => onChange(e)}
          classes={classes} 
          index={index} 
          {...extraProps}
        />
    </div>
  )
}

const editorExtraProps = {
  height: "200px",
  width: "200px",
}


export const FormMakerData = (props: IFormMakerDataProps) => {

  const { 
    handleChange,
    hanldeFormChangeFields,
    data,
    fieldsSchema
    } = props;
  return (
    <Space direction="vertical">
     {fieldsSchema?.map((field : any, index : number) => {
      return (
        <>
        {FieldsFactory(
        field?.type, 
        field?.name, 
        field?.required,
        data?.data[field?.name], 
        index, 
        DynamicFieldClasses[field?.type], 
        handleChange,
        hanldeFormChangeFields,
        field?.type === "object" || field?.type === "array" ? editorExtraProps : null
      )     }
        </>
      )
      })}   
    </Space>
  )
}