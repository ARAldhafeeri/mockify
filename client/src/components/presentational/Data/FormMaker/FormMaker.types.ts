import { IFieldSchema } from "types/forms";

export interface IFormMakerDataProps {
  handleChange:(e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
  hanldeFormChangeFields: (name : string, value: string, type: string) => void;
  data?: any;
  fieldsSchema?: IFieldSchema[];
}