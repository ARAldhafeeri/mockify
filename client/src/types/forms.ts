import { IFetchedDataData } from './Data';
import { IFetchedProjectData } from './Project';
import { IFetchedResourceData } from './Resource';
import { IFetchedUserData } from './User';

export interface IUserForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedUserData
  form: any;
  onFinish?: (values: any) => void;
}


export interface IProjectForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedProjectData
  form: any;
  onFinish?: (values: any) => void;
}


export interface IResourceForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  handleFormChangeFuncs: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  handleFormChangeFeatures: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
  handleAddFunction: (value : string) => void;
  handleRemoveFunction: (index: number) => void;
  handleAddField: (name : string, type : string, required : boolean) => void;
  handleRemoveField: (index: number) => void;
  data: IFetchedResourceData;
  form: any;
  onFinish?: (values: any) => void;
}

export interface IFieldSchema {
  name: string;
  type: string;
  required: boolean;
}
export interface IDataForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedDataData;
  fieldsSchema: Array<IFieldSchema>;
  form: any;
  onFinish?: (values: any) => void;
}