import { IFieldSchema } from "types/forms";

export interface IFormMakerProps {
handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
handleAddField: (name : string, type : string, required : boolean) => void;
handleRemoveField: (index: number) => void;
index: number;
field: IFieldSchema;
}