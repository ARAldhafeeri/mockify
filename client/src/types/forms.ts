import { IFetchedDataData } from './Data';
import { IFetchedPolicyData, IUserDefinedPolicy } from './Policy';
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
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  projectOptions: IFetchedProjectData[];
  data: IFetchedResourceData;
  form: any;
  onFinish?: (values: any) => void;
}

export interface IResourceFormGeneralInfoStepProps {
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  projectOptions: IFetchedProjectData[];
  data: IFetchedResourceData;

}

export interface IResourceFormFeatureStepProps{
  handleFormChangeFeatures: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  data: IFetchedResourceData;
}

export interface IResourceFormFunctionStepProps {
  handleAddFunction: (value : string) => void;
  handleRemoveFunction: (index: number) => void;
  handleFormChangeFuncs: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  data: IFetchedResourceData;
}

export interface IResourceFormFieldsStepProps {
  handleAddField: (name : string, type : string, required : boolean) => void;
  handleRemoveField: (index: number) => void;
  handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
  data: IFetchedResourceData;

}
export interface IFieldSchema {
  name: string;
  type: string;
  required: boolean;
}
export interface IDataForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
  data: IFetchedDataData;
  fieldsSchema: Array<IFieldSchema>;
  form: any;
  onFinish?: (values: any) => void;
}

export interface IPolicyForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (value : string, type: string, index: number) => void;
  data: IFetchedPolicyData;
  form: any;
  onFinish?: (values: any) => void;
  projectOptions?: IFetchedProjectData[];
  // steps
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  // add or remove
  handleAdd: (value : string, type: string) => void;
  handleRemove: (index: number, type: string) => void;
  handleFormChangePolicies: (    
    value: string, 
    valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  handleAddPolicies: (    
    value: any, 
    policyIndex : number, 
    type: string ) => void;
  handleRemovePolicies: ( valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
}

export interface IPolicyFieldsStepProps {
  handleAdd: (value : string, type: string) => void;
  handleRemove: (index: number, type: string) => void;
  data: Array<string>;
  handleFormChange: (value : string, type: string, index: number) => void;
  fieldsType: string;
}


export interface IPolicyPolciesStepProps {
  handleFormChangePolicies: (    
    value: string, 
    valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  handleAddPolicies: (    
    value: any, 
    policyIndex : number, 
    type: string ) => void;
  handleRemovePolicies: ( valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  data: IUserDefinedPolicy[];
  policy?: IFetchedPolicyData
  fieldsType: string;
}

export interface IFormMakerPolicyProps {
  handleFormChange: (value : string, type: string, index: number) => void;
  handleRemove: (value: number, type: string) => void;
  handleAdd: (value: string, type: string) => void;
  data?: any;
  fields?: Array<string> | IUserDefinedPolicy[];
  policy?: IFetchedPolicyData
  fieldsType: string;
  }
  
  export interface IFormMakerPolicyData {
  handleChange:(e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
  data?: any;
  fields?: Array<string>;
  }