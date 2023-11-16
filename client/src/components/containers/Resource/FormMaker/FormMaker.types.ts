import { IFieldSchema } from "types/forms";

export interface IFormMakerResoruceProps {
handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
handleRemoveField: (index: number) => void;
handleAddField: (name : string, type : string, required : boolean) => void;
data?: any;
fieldsSchema?: IFieldSchema[];
}

export interface IFormMakerDataProps {
handleChange:(e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
data?: any;
fieldsSchema?: IFieldSchema[];
}